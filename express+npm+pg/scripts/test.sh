#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

set -x

docker run --rm -v "$PWD":/work:ro dshanley/vacuum lint -d *.openapi.yaml

# Make sure we at least typecheck modules that aren’t covered by tests
tsc --noEmit --skipLibCheck
