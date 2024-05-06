#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

trap 'rm -f hack-for-elm-to-ban-debug-module.js' EXIT

set -x

# Make sure we at least typecheck modules that aren’t covered by tests
elm make src/Main.elm --optimize --output=hack-for-elm-to-ban-debug-module.js
elm make src/Catalogue.elm --output=/dev/null
