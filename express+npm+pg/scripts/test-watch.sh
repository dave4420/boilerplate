#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

. bin/pg.inc.sh

concurrently -names 'pg,tests' \
    'nodemon --config bin/restart-pg.nodemon.json -e sql true' \
    'jest --watch'
