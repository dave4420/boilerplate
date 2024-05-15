#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

source "$(dirname "$0")/pg.inc.sh"

trap 'docker kill pg' EXIT

docker run \
    -p $PGPORT:5432 \
    --tmpfs /var/lib/pg/data \
    -e PGDATA=/var/lib/pg/data \
    -e POSTGRES_USER=$PGUSER \
    -e POSTGRES_PASSWORD=$PGPASSWORD \
    -e POSTGRES_DB=$PGDATABASE \
    --name pg \
    --rm \
    -d \
    postgres:16.3-alpine3.19

# https://hub.docker.com/_/postgres
# Pick a version that matches what you have in production.
# Alpine chosen purely because the image is smaller.

# DAVE: delay until server is ready to accept connections

"${@:-$SHELL}"
