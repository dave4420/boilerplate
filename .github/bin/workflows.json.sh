#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

git ls-files |
    grep -F / |
    sed -nE 's,^([^./][^/]*)/.*,\1,p' |
    sort -u

# DAVE: ignore unchanged files
# DAVE: turn into json for matrix
