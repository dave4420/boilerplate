#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

set -x

lint-openapi *.openapi.yaml

# Make sure we at least typecheck modules that aren’t covered by tests
scripts/gencode.sh
tsc --noEmit --skipLibCheck

bin/withpg.sh jest
