#!/bin/bash


### Variables

SCRIPT_DIR="$(dirname -- "$0")"
IMAGE_PATH="$SCRIPT_DIR/../public/images"

# WEBP_PATH="/c/Program Files/WebP/libwebp-1.3.1-windows-x64/bin"

find $IMAGE_PATH/augments -type f -name '*.png' -exec sh -c '
    for image do 
        "/c/Program Files/WebP/libwebp-1.3.1-windows-x64/bin"/cwebp.exe -q 20 "$image" -o "${image%.png}.webp" 
    done
' exec-sh {} +

find $IMAGE_PATH/champions -type f -name '*.png' -exec sh -c '
    for image do 
        "/c/Program Files/WebP/libwebp-1.3.1-windows-x64/bin"/cwebp.exe -q 80 "$image" -o "${image%.png}.webp" 
    done
' exec-sh {} +

find $IMAGE_PATH/items -type f -name '*.png' -exec sh -c '
    for image do 
        "/c/Program Files/WebP/libwebp-1.3.1-windows-x64/bin"/cwebp.exe -q 20 "$image" -o "${image%.png}.webp" 
    done
' exec-sh {} +

find $IMAGE_PATH/traits -type f -name '*.png' -exec sh -c '
    for image do 
        "/c/Program Files/WebP/libwebp-1.3.1-windows-x64/bin"/cwebp.exe -q 0 "$image" -o "${image%.png}.webp" 
    done
' exec-sh {} +

# search and replace .png in project