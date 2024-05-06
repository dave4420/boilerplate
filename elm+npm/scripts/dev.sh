#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

mkdir -p dist

elm-live --dir=./dist -- src/Main.elm --output=dist/index.html --debug
