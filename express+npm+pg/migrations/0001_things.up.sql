CREATE TABLE things (
    thing_id        UUID PRIMARY KEY,
    name            TEXT NOT NULL,
    quantity        INTEGER NOT NULL,
    when_created    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    when_updated    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
