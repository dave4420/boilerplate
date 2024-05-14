#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

set -x

# Make sure we at least typecheck modules that aren’t covered by tests
tsc --noEmit --skipLibCheck
