#!/bin/bash
set -eu
IFS=$'\n\t'
# no -o pipefail because `docker logs` will write to a broken pipe

bin="$(dirname "$0")"

source "$bin/pg.inc.sh"

trap "$bin/stop-pg.sh" EXIT

"$bin/start-pg.sh"

"${@:-$SHELL}"
