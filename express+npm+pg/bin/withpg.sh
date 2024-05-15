#!/bin/bash
set -eu
IFS=$'\n\t'
# no -o pipefail because `docker logs` will write to a broken pipe

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

# PG starts, stops, then starts again, so waiting for it to accept
# connections isn't good enough — it might be about to shutdown before
# starting again. We resort to log scraping.
# https://github.com/docker-library/postgres/issues/146
docker logs -f --since 1m pg 2>&1 |
    (perl -e '
        while (<>) {
            last if /.*PostgreSQL init process complete; ready for start up.*/;
        }
        while (<>) {
            last if /.*database system is ready to accept connections.*/;
        }
    ' && printf 'log something\n' >/dev/tcp/localhost/$PGPORT)

docker run \
    -v "$PWD"/migrations:/migrations \
    --network host \
    --name migrate \
    --rm \
    migrate/migrate \
        -path=/migrations/ \
        -database postgres://$PGUSER:$PGPASSWORD@localhost:$PGPORT/$PGDATABASE?sslmode=disable \
        up

"${@:-$SHELL}"
