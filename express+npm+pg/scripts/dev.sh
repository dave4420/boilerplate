#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

nodemon --exec ts-node src/index.ts | pino-pretty
