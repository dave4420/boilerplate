#!/bin/bash
IFS=$'\n\t'
set -exuo pipefail

# Make sure we at least typecheck modules that aren’t covered by tests
elm make src/Main.elm --optimize --output=/dev/null
elm make src/Catalogue.elm --output=/dev/null
