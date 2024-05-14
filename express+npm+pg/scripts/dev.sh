#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

ts-node src/index.ts | pino-pretty
