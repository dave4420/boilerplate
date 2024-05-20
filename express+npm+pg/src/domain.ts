import uuid from "uuid";

import { branded, Branded } from "./branding";

export type Thing = Readonly<{
  thingId: Thing.Id;
  name: string;
  quantity: number;
}>;

export namespace Thing {
  export type Id = Branded<string, Thing>;
  export const idOrNull = (raw: string): Id | null => {
    if (!uuid) {
      throw Error("uuid is not defined");
    }
    if (!uuid.validate) {
      throw Error("uuid.validate is not defined");
    }
    return uuid.validate(raw) ? branded(raw.toLowerCase()) : null;
  };
}
