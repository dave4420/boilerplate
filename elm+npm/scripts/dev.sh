#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

find dist -name '*.js' -delete

concurrently --names 'elm,ts' \
    'elm-live --dir=./dist -- src/Main.elm --output=dist/elm.js --debug' \
    'tsc --watch --preserveWatchOutput --outFile ./dist/ts.js'

# DAVE: confirm whether tsc is bundling libraries
