CREATE TABLE things (
    thing_id        UUID PRIMARY KEY,
    name            TEXT NOT NULL,
    quantity        INTEGER NOT NULL,
    when_created    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    when_updated    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_when_updated() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.when_updated = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_things_when_updated
BEFORE UPDATE ON things
FOR EACH ROW EXECUTE PROCEDURE update_when_updated();
