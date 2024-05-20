import uuid from "uuid";

import { branded, Branded } from "./branding";

export type Thing = Readonly<{
  thingId: Thing.Id;
  name: string;
  quantity: number;
}>;

export namespace Thing {
  export type Id = Branded<string, Thing>;
  export const idOrNull = (raw: string): Id | null =>
    uuid.validate(raw) ? branded(raw.toLowerCase()) : null;
}
