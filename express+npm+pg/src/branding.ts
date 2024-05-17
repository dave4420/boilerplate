const brand = Symbol("brand");

export type Branded<T, U> = T & { [brand]: U };
export type Unbranded<T> = T extends Branded<infer U, any> ? U : never;

export const branded = <T, U>(value: T): Branded<T, U> =>
  value as Branded<T, U>;
