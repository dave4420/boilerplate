#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

target_branch="${1-refs/remotes/origin/HEAD}"
wip_branch="${2-HEAD}"

base="$(git merge-base "$target_branch" "$wip_branch")"

git diff --name-status --no-renames "$base" "$wip_branch" |
    grep -F / |
    sed -nE 's,^[^\t]+\t([^./][^/]*)/.*,\1,p' |
    sort -u |
    jq --raw-input --slurp --compact-output '
        split("\n") |
        map(select(. != ""))
    '
