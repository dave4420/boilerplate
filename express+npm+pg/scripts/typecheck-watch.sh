#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

concurrently --names 'tsc,orval' \
    'tsc --noEmit --skipLibCheck --watch' \
    'orval --watch'
