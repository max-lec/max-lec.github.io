#!/bin/bash


### Variables

SCRIPT_DIR="$(dirname -- "$0")"
DATA_PATH="$SCRIPT_DIR"/../public/data/traits
IMAGE_PATH="public/images/traits"

# tftactics https://tftactics.gg/db/origins
# can't curl because JS needs enabling -> copy page html by hand to DATA_PATH/tmp/tftactics.html.tmp
# remove the first react-table to avoid DUPLICATES

TRAITS_LIST=$(grep -A 3 'class="characters-item trait-table"' "${DATA_PATH}/tmp/tftactics.html.tmp" | grep "alt=" | sed -n 's|.*alt="\(.*\)".*|\1|p')
readarray -t TRAITS_ARRAY_TMP <<< $TRAITS_LIST
OLD_IFS=$IFS
IFS=$'\n' 
TRAITS_ARRAY=($(sort <<<"${TRAITS_ARRAY_TMP[*]}"))
IFS=$OLD_IFS

TRAIT_ID=0
for trait in "${TRAITS_ARRAY[@]}"; do
    echo "$trait"
    TRAIT_NAME="$trait"
    TRAIT_ID=$(( TRAIT_ID + 1 ))
    TRAIT_DESC=$(grep -A35 "$trait" "${DATA_PATH}/tmp/tftactics.html.tmp" |  sed -n '/>'"$trait"'/,/table-bonus-item/p' | tr -d \\n | sed 's|\s\{2,\}| |g' | sed -n 's|.*table-bonus-heading">\(.*\)</div>.*|\1|p' )
    
    TRAIT_IMAGE_SRC=$(grep -i "${trait}.png" "${DATA_PATH}/tmp/tftactics.html.tmp" | head -n 1 | cut -d '"' -f 2)
    TRAIT_IMAGE_PATH="$IMAGE_PATH/${trait}.png"
    curl -s "$TRAIT_IMAGE_SRC" --output "$SCRIPT_DIR/../$TRAIT_IMAGE_PATH"

    TRAIT_DATA_TMP=$(grep -A35 "$trait" "${DATA_PATH}/tmp/tftactics.html.tmp" | sed -n '/alt="'"$trait"'/,/table-images/p' | sed -n '/alt="'"$trait"'/,/rowgroup/p')
    TRAIT_LEVELS=$(echo "$TRAIT_DATA_TMP" | grep "table-bonus-count" | cut -d '>' -f 2 | cut -d '<' -f 1)
    TRAIT_LEVELS_JSON="["
    for level in $TRAIT_LEVELS; do
        LEVEL_DESC=$(echo "$TRAIT_DATA_TMP" | sed -n '/table-bonus-count">'$level'/,/table-bonus-item/p' | sed -n '/bonus-value/,/<\/div>/p' | tr -d \\n | sed 's|\s\{2,\}| |g' | cut -d '>' -f 2 | cut -d '<' -f 1)
        LEVEL_DATA='{ "level": '$level', "desc": "'$LEVEL_DESC'" },'
        TRAIT_LEVELS_JSON+=$LEVEL_DATA
    done
    TRAIT_LEVELS_JSON=$(echo $TRAIT_LEVELS_JSON | sed 's|.$||')
    TRAIT_LEVELS_JSON+="]"
    
    echo "$TRAIT_LEVELS_JSON"
    jq -n \
                  --arg name "$TRAIT_NAME" \
                  --arg id "$TRAIT_ID" \
                  --arg desc "$TRAIT_DESC" \
                  --arg srcPath "$TRAIT_IMAGE_PATH" \
                  --argjson levels "$TRAIT_LEVELS_JSON" \
                  '{ 
                    name: $name, 
                    id: $id, 
                    desc: $desc,
                    srcPath: $srcPath,
                    levels: $levels
                    }' > "${DATA_PATH}/${trait}.json"

done

### Concat final stats file 

jq -s . $DATA_PATH/*.json > $DATA_PATH/final/stats.json