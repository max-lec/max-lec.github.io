#!/bin/bash



### Variables

SCRIPT_DIR="$(dirname -- "$0")"
DATA_PATH="$SCRIPT_DIR"/../public/data/champions



### Download champions stats

# CHAMPION_URLS=$(curl "https://lolchess.gg/champions/set9/aatrox" | grep -A 2 "guide-champion-list__item__name" | grep lolchess | cut -d '"' -f 4)

# for url in $CHAMPION_URLS; do
#     championName="${url##*/}"
#     curl "$url" --output "${DATA_PATH}/${championName}.html"
# done

CHAMP_ID=0
for file in $DATA_PATH/*.html; do
    CHAMP_NAME=$(sed -n 's|^.*<span class="guide-champion-detail__name">\(.*\)</span>|\1|p' $file)
    CHAMP_ID=$(( CHAMP_ID + 1 ))
    
    TRAITS=$(sed -n 's|^.*<img src=".*images/traits/.*" alt="\(.*\)" width|\1|p' $file)
    CHAMP_TYPE=$(echo "[ \"$(echo $TRAITS | sed 's| |\n|g' | sed 's|=.*$|,|g' | sed 's|height.*$||g' | xargs | sed 's|.$||' )\" ]")
    
    CHAMP_SPELL_DESC=$(sed -n '/guide-champion-detail__skill/,/guide-champion-detail__skill__stats/p' $file | sed 's|</div>|\n|g' | grep 'class="d-block mt-1"' | sed "s|'||g" | xargs | sed -n 's|.*mt-1>\(.*\)</span>.*|\1|p' | sed 's|<br>|\n|g')
    CHAMP_SPELL_STATS=$(sed -n '/guide-champion-detail__skill__stats/,/guide-champion-detail__synergies/p' $file | sed "s|'||g" | xargs | sed 's|</div>|\n|g' | head -n -1 | sed 's|^\s*$||g' )
    SPELL_JSON="["
    readarray -t STATS_ARRAY <<< $CHAMP_SPELL_STATS
    for stat in "${STATS_ARRAY[@]}"; do 
        SPELL_LABEL=$(echo "$stat"| sed 's|class=guide-champion-detail__skill__stats>||g' | cut -d '>' -f 3 | cut -d '<' -f 1)
        SPELL_STAT=$(echo "$stat" | cut -d ':' -f 2 | cut -d '<' -f 1 | sed 's|^.||g' | sed 's| / |\n|g' | sed 's|^|"|g' | sed 's|$|",|g')
        SPELL_JSON+='{ "key": "'"$SPELL_LABEL"'", "stats": ['"$SPELL_STAT"']},' 
    done
    SPELL_JSON=$(echo "$SPELL_JSON" | tr -d \\n | sed 's|.$||' | sed 's|,]|]|g')
    SPELL_JSON+="]"
    echo "$SPELL_JSON"

    HEALTH_1=$(grep -A10 "guide-champion-detail__base-stat__name" $file | grep -A 6 "Health" | sed -n '4p')
    HEALTH_2=$(grep -A10 "guide-champion-detail__base-stat__name" $file | grep -A 6 "Health" | sed -n '6p')
    CHAMP_HEALTH=$(echo "[$HEALTH_1, $(echo $HEALTH_2 | cut -d '/' -f 2)", $(echo $HEALTH_2 | cut -d '/' -f 3)"]")
    CHAMP_ARMOR=$(echo "[" $(grep -A10 "guide-champion-detail__base-stat__name" $file | grep -A 6 "Armor" | sed -n '4p') "]")
    CHAMP_RES=$(echo "[" $(grep -A10 "guide-champion-detail__base-stat__name" $file | grep -A 6 "Magical Resistance" | sed -n '4p') "]")
    MANA=$(grep "<span>Mana:"  $file | sed -n 's|<span>Mana: \(.*\)</span>|\1|p')
    CHAMP_MANA_START=$(echo $MANA | cut -d '/' -f 1)
    CHAMP_MANA_COST=$(echo $MANA | cut -d '/' -f 2)
    CHAMP_AP="100"
    ATTACK_1=$(grep -A10 "guide-champion-detail__base-stat__name" $file | grep -A 6 "Attack Damage" | sed -n '4p')
    ATTACK_2=$(grep -A10 "guide-champion-detail__base-stat__name" $file | grep -A 6 "Attack Damage" | sed -n '6p')
    CHAMP_ATTACK=$(echo "[$ATTACK_1, $(echo $ATTACK_2 | cut -d '/' -f 2)", $(echo $ATTACK_2 | cut -d '/' -f 3)"]")
    CHAMP_SPEED=$(grep -A10 "guide-champion-detail__base-stat__name" $file | grep -A 6 "Attack Speed" | sed -n '4p' | xargs)
    
    jq -n \
                  --arg name "$CHAMP_NAME" \
                  --arg id "$CHAMP_ID" \
                  --argjson type "$CHAMP_TYPE" \
                  --argjson health "$CHAMP_HEALTH" \
                  --argjson armor "$CHAMP_ARMOR" \
                  --argjson resistance "$CHAMP_RES" \
                  --arg mana_start "$CHAMP_MANA_START" \
                  --arg mana_cost "$CHAMP_MANA_COST" \
                  --arg ap "$CHAMP_AP" \
                  --argjson attack "$CHAMP_ATTACK" \
                  --arg speed "$CHAMP_SPEED" \
                  --arg spell_desc "$CHAMP_SPELL_DESC" \
                  --argjson spell "$SPELL_JSON" \
                  '{ 
                    name: $name, 
                    id: $id, 
                    type: $type,
                    spell_desc: $spell_desc,
                    spell: $spell,
                    health: $health,
                    armor: $armor,
                    resistance: $resistance,
                    mana_start: $mana_start,
                    mana_cost: $mana_cost,
                    ap: $ap,
                    attack: $attack,
                    speed: $speed
                    }' > ${file%.*}.json
        
done


### Concat final stats file 

jq -s . $DATA_PATH/*.json > $DATA_PATH/final/stats.json
