#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

nodemon --config bin/restart-pg.nodemon.json -e sql true </dev/null &

jest --watch

kill $(jobs -p)
