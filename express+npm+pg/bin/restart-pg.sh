#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

bin="$(dirname "$0")"

"$bin/stop-pg.sh"
"$bin/start-pg.sh"
