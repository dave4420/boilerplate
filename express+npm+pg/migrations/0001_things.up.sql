CREATE TABLE things (
    thing_id        BIGSERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    quantity        INTEGER NOT NULL,
    when_created    TIMESTAMP NOT NULL DEFAULT NOW(),
    when_updated    TIMESTAMP NOT NULL DEFAULT NOW()
);
