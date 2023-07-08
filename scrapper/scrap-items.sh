#!/bin/bash


### Variables

SCRIPT_DIR="$(dirname -- "$0")"
DATA_PATH="$SCRIPT_DIR"/../public/data/items
IMAGE_PATH="public/images/items"

# https://lolchess.gg/items/set9?hl=en
# can't curl because JS needs enabling -> copy page html by hand
# remove DUPLICATES

ITEMS_LIST=$(grep '<span>' ${DATA_PATH}/html/lolchess.html  | cut -d '>' -f 2 | cut -d '<' -f 1)
readarray -t ITEMS_ARRAY <<< $ITEMS_LIST


ITEM_ID=0
for item in "${ITEMS_ARRAY[@]}"; do
    # echo "$item"
    ITEM_NAME="$item"
    ITEM_ID=$(( ITEM_ID + 1 ))
    
    ITEM_IMAGE_SRC=$(grep -B 5 "$item" ${DATA_PATH}/html/lolchess.html | grep "<img src" | head -n 1 | cut -d '"' -f 2 | sed 's| |%20|g')
    ITEM_IMAGE_PATH="$IMAGE_PATH/${item}.png"
    curl -s "https:${ITEM_IMAGE_SRC}" --output "$SCRIPT_DIR/../$ITEM_IMAGE_PATH"

    DESC_URL=$(grep -A 2 -B 2 "$item" ${DATA_PATH}/html/lolchess.html | grep 'data-toggle="tooltip" data-tooltip-url=' | head -n 1 | cut -d '=' -f 3 | cut -d '"' -f 2 | sed 's| |%20|g')
    curl -s "$DESC_URL" --output "${DATA_PATH}/html/${item}.html"

    ITEM_EFFECT=$(sed -n '/<div>/,/<\/div>/p' "${DATA_PATH}/html/${item}.html" | sed "s|'||g" | xargs | sed 's|.*<div>\(.*\).*</div>.*|\1|' )
    if grep -qe "Mod:" <(echo "$ITEM_EFFECT"); then
        # skip zaun mods for now
        continue
    fi

    ITEM_STATS=$(grep -A 8 'line-height-1' "${DATA_PATH}/html/${item}.html" | sed 's|<br>|\n|g' | sed 's|<div>|\n|g' | sed 's|</div>|\n|g' | sed 's|,|\n|g' )

    # basic stats for now
    if grep -qe "[Hh]ealth" <(echo "$ITEM_STATS"); then
        HEALTH=$(echo "$ITEM_STATS" | grep -e "[Hh]ealth" | sed 's|+\(.*\) .*[Hh]ealth.*|\1|' | xargs)
    else 
        HEALTH=0
    fi
    if grep -qe "[Aa]rmor" <(echo "$ITEM_STATS"); then
        ARMOR=$(echo "$ITEM_STATS" | grep -e "[Aa]rmor" | sed 's|+\(.*\) .*[Aa]rmor.*|\1|' | xargs)
    else 
        ARMOR=0
    fi
    if grep -qe "Magic [Rr]esist" <(echo "$ITEM_STATS"); then
        RESISTANCE=$(echo "$ITEM_STATS" | grep -e "Magic [Rr]esist" | sed 's|+\(.*\) .*Magic [Rr]esist.*|\1|' | xargs)
    else 
        RESISTANCE=0
    fi
    if grep -qe "[Mm]ana" <(echo "$ITEM_STATS"); then
        MANA=$(echo "$ITEM_STATS" | grep -e "[Mm]ana" | sed 's|+\(.*\) .*[Mm]ana.*|\1|' | xargs)
    else 
        MANA=0
    fi
    if grep -qe "Ability [Pp]ower" <(echo "$ITEM_STATS"); then
        AP=$(echo "$ITEM_STATS" | grep -e "Ability [Pp]ower" | sed 's|+\(.*\) .*Ability [Pp]ower.*|\1|' | xargs)
    else 
        AP=0
    fi
    if grep -qe "Attack [Dd]amage" <(echo "$ITEM_STATS"); then
        ATTACK=$(echo "$ITEM_STATS" | grep -e "Attack [Dd]amage" | sed 's|+\(.*\)%* .*Attack [Dd]amage.*|\1|' | xargs)
    else 
        ATTACK=0
    fi
    if grep -qe "Attack [Ss]peed" <(echo "$ITEM_STATS"); then
        SPEED=$(echo "$ITEM_STATS" | grep -e "Attack [Ss]peed" | sed 's|+\(.*\)%* .*Attack [Ss]peed.*|\1|' | xargs)
    else 
        SPEED=0
    fi
    if grep -qe "[Cc]rit.*[Cc]hance" <(echo "$ITEM_STATS"); then
        CRIT=$(echo "$ITEM_STATS" | grep -e "[Cc]rit.*[Cc]hance" | sed 's|+\(.*\)%* .*[Cc]rit.*[Cc]hance.*|\1|' | xargs)
    else 
        CRIT=0
    fi
    jq -n \
                  --arg name "$ITEM_NAME" \
                  --arg id "$ITEM_ID" \
                  --arg desc "$ITEM_EFFECT" \
                  --arg srcPath "$ITEM_IMAGE_PATH" \
                  --arg health "$HEALTH" \
                  --arg armor "$ARMOR" \
                  --arg resistance "$RESISTANCE" \
                  --arg mana_start "$MANA" \
                  --arg ap "$AP" \
                  --arg attack "$ATTACK" \
                  --arg speed "$SPEED" \
                  --arg criticalChance "$CRIT" \
                  '{ 
                    name: $name, 
                    id: $id, 
                    desc: $desc,
                    srcPath: $srcPath,
                    health: $health,
                    armor: $armor,
                    resistance: $resistance,
                    mana_start: $mana_start,
                    ap: $ap,
                    attack: $attack,
                    speed: $speed,
                    critical_chance: $criticalChance
                    }' > "${DATA_PATH}/${item}.json"

done

## Concat final stats file 

jq -s . $DATA_PATH/*.json > $DATA_PATH/final/stats.json