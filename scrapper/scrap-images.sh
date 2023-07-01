#!/bin/bash



### Variables

SCRIPT_DIR="$(dirname -- "$0")"
IMAGES_PATH="$SCRIPT_DIR"/../public/images



### Download champions

TMP_FILE="$SCRIPT_DIR"/../public/data/champions/tftactics.html.tmp
CHAMPION_IMAGE_URLS=$(grep 'src="https://rerollcdn.com/characters' "$TMP_FILE" | cut -d '=' -f2 | cut -d '"' -f2)

for imgUrl in $CHAMPION_IMAGE_URLS; do
    fileName=$(echo "$imgUrl" | awk -F '/' '{print $NF}')
    curl $imgUrl > "${IMAGES_PATH}/champions/${fileName}" 
done



### Download items

TMP_FILE="$SCRIPT_DIR"/../public/data/items/tftactics.html.tmp
ITEM_IMAGE_URLS=$(grep 'src="https://rerollcdn.com/items' "$TMP_FILE" | cut -d '=' -f2 | cut -d '"' -f2)

for imgUrl in $ITEM_IMAGE_URLS; do
    fileName=$(echo "$imgUrl" | awk -F '/' '{print $NF}')
    curl $imgUrl > "${IMAGES_PATH}/items/${fileName}" 
done

