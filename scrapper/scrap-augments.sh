#!/bin/bash


### Variables

SCRIPT_DIR="$(dirname -- "$0")"
DATA_PATH="$SCRIPT_DIR"/../public/data/augments
IMAGE_PATH="public/images/augments"

# https://lolchess.gg/guide/augments/set9?tier=1


### Download augment list

# curl "https://lolchess.gg/guide/augments/set9?tier=1" --output "${DATA_PATH}/augments-1.html"
# curl "https://lolchess.gg/guide/augments/set9?tier=2" --output "${DATA_PATH}/augments-2.html"
# curl "https://lolchess.gg/guide/augments/set9?tier=3" --output "${DATA_PATH}/augments-3.html"

AUGMENT_1_LIST=$(grep "guide-augments__title" "${DATA_PATH}/augments-1.html" | cut -d '>' -f 2)
readarray -t AUGMENT_1_ARRAY <<< $AUGMENT_1_LIST
AUGMENT_2_LIST=$(grep "guide-augments__title" "${DATA_PATH}/augments-2.html" | cut -d '>' -f 2)
readarray -t AUGMENT_2_ARRAY <<< $AUGMENT_2_LIST
AUGMENT_3_LIST=$(grep "guide-augments__title" "${DATA_PATH}/augments-3.html" | cut -d '>' -f 2)
readarray -t AUGMENT_3_ARRAY <<< $AUGMENT_3_LIST

AUGMENT_ID=0
for augment in "${AUGMENT_1_ARRAY[@]}"; do
    echo "$augment"
    AUGMENT_NAME="$augment"

    AUGMENT_ID=$(( AUGMENT_ID + 1 ))

    AUGMENT_DESC=$(grep -A 2 "$augment" "${DATA_PATH}/augments-1.html" | grep "guide-augments__desc" | sed -n 's|<p.*>\(.*\)</p>|\1|p' | xargs)
    
    AUGMENT_IMAGE_SRC=$(grep -B 2 "$augment" "${DATA_PATH}/augments-1.html" | grep "img src" | cut -d '"' -f 2)
    AUGMENT_IMAGE_PATH="$IMAGE_PATH/${augment}.png"
    curl -s "https:$AUGMENT_IMAGE_SRC" --output "$SCRIPT_DIR/../$AUGMENT_IMAGE_PATH"

    AUGMENT_STATS="{" 
    if grep -e "gain[s]* [0-9][0-9%.-]* [Hh]ealth" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"health": '"$(echo "$AUGMENT_DESC" | sed 's|.*gain[s]* \([0-9%][0-9%.-]*\) [Hh]ealth.*|\1 |' | sed 's|.*-\([0-9%.-]*\).*|\1 |')"","
    else 
        AUGMENT_STATS+='"health": '"0,"
    fi
    if grep -e "[Aa]rmor[., ]" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"armor": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Aa]rmor.*|\1 |')"","
    else 
        AUGMENT_STATS+='"armor": '"0,"
    fi
    if grep -e "[Mm]agic [Rr]esist[., ]" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"resistance": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Mm]agic [Rr]esist.*|\1 |')"","
    else 
        AUGMENT_STATS+='"resistance": '"0,"
    fi
    if grep -e "[0-9][0-9]* [Mm]ana" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"mana": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Mm]ana.*|\1 |')"","
    else 
        AUGMENT_STATS+='"mana": '"0,"
    fi
    if grep -e "Ability Power" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"ap": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Ability Power.*|\1 |')"","
    else 
        AUGMENT_STATS+='"ap": '"0,"
    fi
    if grep -e "Attack Damage" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"attack": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Attack Damage.*|\1 |')"","
    else 
        AUGMENT_STATS+='"attack": '"0,"
    fi
    if grep -e "Attack Speed" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"speed": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Attack Speed.*|\1 |' | sed 's|.*-\([0-9%.-]*\).*|\1 |')"","
    else 
        AUGMENT_STATS+='"speed": '"0,"
    fi

    AUGMENT_STATS=$(echo $AUGMENT_STATS | sed 's|%||g' | sed 's|.$||') # remove last comma and %
    AUGMENT_STATS+="}"

    jq -n \
                  --arg name "$AUGMENT_NAME" \
                  --arg id "$AUGMENT_ID" \
                  --arg desc "$AUGMENT_DESC" \
                  --arg srcPath "$AUGMENT_IMAGE_PATH" \
                  --argjson stats "$AUGMENT_STATS" \
                  '{ 
                    name: $name, 
                    id: $id, 
                    desc: $desc,
                    srcPath: $srcPath,
                    stats: $stats
                    }' > "${DATA_PATH}/${augment}.json"
        
done



for augment in "${AUGMENT_2_ARRAY[@]}"; do
    echo "$augment"
    AUGMENT_NAME="$augment"

    AUGMENT_ID=$(( AUGMENT_ID + 1 ))

    AUGMENT_DESC=$(grep -A 2 "$augment" "${DATA_PATH}/augments-2.html" | grep "guide-augments__desc" | sed -n 's|<p.*>\(.*\)</p>|\1|p' | xargs)
    
    AUGMENT_IMAGE_SRC=$(grep -B 2 "$augment" "${DATA_PATH}/augments-2.html" | grep "img src" | cut -d '"' -f 2)
    AUGMENT_IMAGE_PATH="$IMAGE_PATH/${augment}.png"
    curl -s "https:$AUGMENT_IMAGE_SRC" --output "$SCRIPT_DIR/../$AUGMENT_IMAGE_PATH"

    AUGMENT_STATS="{" 
    if grep -e "gain[s]* [0-9][0-9%.-]* [Hh]ealth" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"health": '"$(echo "$AUGMENT_DESC" | sed 's|.*gain[s]* \([0-9%][0-9%.-]*\) [Hh]ealth.*|\1|' | sed 's|.*-\([0-9%.-]*\).*|\1 |' )"","
    else 
        AUGMENT_STATS+='"health": '"0,"
    fi
    if grep -e "[Aa]rmor[., ]" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"armor": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Aa]rmor.*|\1 |')"","
    else 
        AUGMENT_STATS+='"armor": '"0,"
    fi
    if grep -e "[Mm]agic [Rr]esist[., ]" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"resistance": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Mm]agic [Rr]esist.*|\1 |')"","
    else 
        AUGMENT_STATS+='"resistance": '"0,"
    fi
    if grep -e "[0-9][0-9]* [Mm]ana" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"mana": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Mm]ana.*|\1 |')"","
    else 
        AUGMENT_STATS+='"mana": '"0,"
    fi
    if grep -e "Ability Power" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"ap": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Ability Power.*|\1 |')"","
    else 
        AUGMENT_STATS+='"ap": '"0,"
    fi
    if grep -e "Attack Damage" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"attack": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Attack Damage.*|\1 |')"","
    else 
        AUGMENT_STATS+='"attack": '"0,"
    fi
    if grep -e "Attack Speed" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"speed": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Attack Speed.*|\1 |' | sed 's|.*-\([0-9%.-]*\).*|\1 |')"","
    else 
        AUGMENT_STATS+='"speed": '"0,"
    fi

    AUGMENT_STATS=$(echo $AUGMENT_STATS | sed 's|%||g' | sed 's|.$||') # remove last comma and %
    AUGMENT_STATS+="}"

    jq -n \
                  --arg name "$AUGMENT_NAME" \
                  --arg id "$AUGMENT_ID" \
                  --arg desc "$AUGMENT_DESC" \
                  --arg srcPath "$AUGMENT_IMAGE_PATH" \
                  --argjson stats "$AUGMENT_STATS" \
                  '{ 
                    name: $name, 
                    id: $id, 
                    desc: $desc,
                    srcPath: $srcPath,
                    stats: $stats
                    }' > "${DATA_PATH}/${augment}.json"
        
done

for augment in "${AUGMENT_3_ARRAY[@]}"; do
    echo "$augment"
    AUGMENT_NAME="$augment"

    AUGMENT_ID=$(( AUGMENT_ID + 1 ))

    AUGMENT_DESC=$(grep -A 2 "$augment" "${DATA_PATH}/augments-3.html" | grep "guide-augments__desc" | sed -n 's|<p.*>\(.*\)</p>|\1|p' | xargs)
    
    AUGMENT_IMAGE_SRC=$(grep -B 2 "$augment" "${DATA_PATH}/augments-3.html" | grep "img src" | cut -d '"' -f 2)
    AUGMENT_IMAGE_PATH="$IMAGE_PATH/${augment}.png"
    curl -s "https:$AUGMENT_IMAGE_SRC" --output "$SCRIPT_DIR/../$AUGMENT_IMAGE_PATH"

    AUGMENT_STATS="{" 
    if grep -e "gain[s]* [0-9][0-9%.-]* [Hh]ealth" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"health": '"$(echo "$AUGMENT_DESC" | sed 's|.*gain[s]* \([0-9%][0-9%.-]*\) [Hh]ealth.*|\1|' | sed 's|.*-\([0-9%.-]*\).*|\1 |')"","
    else 
        AUGMENT_STATS+='"health": '"0,"
    fi
    if grep -e "[Aa]rmor[., ]" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"armor": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Aa]rmor.*|\1 |')"","
    else 
        AUGMENT_STATS+='"armor": '"0,"
    fi
    if grep -e "[Mm]agic [Rr]esist[., ]" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"resistance": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Mm]agic [Rr]esist.*|\1 |')"","
    else 
        AUGMENT_STATS+='"resistance": '"0,"
    fi
    if grep -e "[0-9][0-9]* [Mm]ana" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"mana": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*[Mm]ana.*|\1 |')"","
    else 
        AUGMENT_STATS+='"mana": '"0,"
    fi
    if grep -e "Ability Power" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"ap": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Ability Power.*|\1 |')"","
    else 
        AUGMENT_STATS+='"ap": '"0,"
    fi
    if grep -e "Attack Damage" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"attack": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Attack Damage.*|\1 |')"","
    else 
        AUGMENT_STATS+='"attack": '"0,"
    fi
    if grep -e "Attack Speed" <(echo "$AUGMENT_DESC"); then
        AUGMENT_STATS+='"speed": '"$(echo "$AUGMENT_DESC" | sed 's|.* \([0-9%][0-9%.-]*\) .*Attack Speed.*|\1 |' | sed 's|.*-\([0-9%.-]*\).*|\1 |' )"","
    else 
        AUGMENT_STATS+='"speed": '"0,"
    fi

    AUGMENT_STATS=$(echo $AUGMENT_STATS | sed 's|%||g' | sed 's|.$||') # remove last comma and %
    AUGMENT_STATS+="}"

    jq -n \
                  --arg name "$AUGMENT_NAME" \
                  --arg id "$AUGMENT_ID" \
                  --arg desc "$AUGMENT_DESC" \
                  --arg srcPath "$AUGMENT_IMAGE_PATH" \
                  --argjson stats "$AUGMENT_STATS" \
                  '{ 
                    name: $name, 
                    id: $id, 
                    desc: $desc,
                    srcPath: $srcPath,
                    stats: $stats
                    }' > "${DATA_PATH}/${augment}.json"
        
done
### Concat final stats file 

jq -s . $DATA_PATH/*.json > $DATA_PATH/final/stats.json