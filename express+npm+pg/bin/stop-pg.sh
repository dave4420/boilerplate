#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

docker kill pg
