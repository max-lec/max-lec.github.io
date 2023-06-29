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



### Download traits

TMP_FILE="$SCRIPT_DIR"/../public/data/traits/tftactics.html.tmp
TRAIT_IMAGE_URLS=$(grep 'src="https://rerollcdn.com/icons' "$TMP_FILE" | cut -d '=' -f2 | cut -d '"' -f2)

for imgUrl in $TRAIT_IMAGE_URLS; do
    fileName=$(echo "$imgUrl" | awk -F '/' '{print $NF}')
    curl $imgUrl > "${IMAGES_PATH}/traits/${fileName}" 
done



### Download augments

TMP_FILE="$SCRIPT_DIR"/../public/data/augments/tactics.tools.html.tmp
AUGMENT_IMAGE_URLS=$(grep 'srcset="https://ap.tft.tools/img/augments/' ./public/data/augments/tactics.tools.html.tmp | cut -d'=' -f2 | cut -d '"' -f2 | cut -d '?' -f1)

for imgUrl in $AUGMENT_IMAGE_URLS; do
    fileName=$(echo "$imgUrl" | awk -F '/' '{print $NF}')
    curl $imgUrl > "${IMAGES_PATH}/augments/${fileName}" 
done