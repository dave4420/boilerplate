#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

find dist -name '*.js' -delete

elm-live --dir=./dist -- src/Main.elm --output=dist/elm.js --debug
