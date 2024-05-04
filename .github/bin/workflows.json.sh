#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

git ls-files |
    grep -F / |
    sed -nE 's,^([^./][^/]*)/.*,\1,p' |
    sort -u |
    jq --raw-input --slurp --compact-output '
        split("\n") |
        map(select(. != ""))
    '

# DAVE: ignore unchanged files
