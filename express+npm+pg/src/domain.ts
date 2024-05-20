import * as uuid from "uuid";

import { branded, Branded } from "./branding";

export type Thing = Readonly<{
  thingId: Thing.Id;
  name: string;
  quantity: number;
}>;

export namespace Thing {
  export type Id = Branded<string, Thing>;
  export const idOrNull = (raw: string): Id | null => {
    return uuid.validate(raw) ? branded(raw.toLowerCase()) : null;
  };
}
