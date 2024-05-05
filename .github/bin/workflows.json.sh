#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

base="$(git merge-base ${1-refs/remotes/origin/HEAD} HEAD)"

git diff --name-status --no-renames "$base" |
    grep -F / |
    sed -nE 's,^[^\t]+\t([^./][^/]*)/.*,\1,p' |
    sort -u |
    jq --raw-input --slurp --compact-output '
        split("\n") |
        map(select(. != ""))
    '
