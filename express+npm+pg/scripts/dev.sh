#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

bin/withpg.sh \
    concurrently --names 'express,orval' \
        'nodemon --exec ts-node src/index.ts | pino-pretty' \
        'orval --watch'
