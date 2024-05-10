// types adapted from elm-ts-interop

declare namespace Elm.Main {
  function init(options: { node?: HTMLElement | null; flags: Flags }): App;
}

type Flags = null;

type Cmd<Payload> = Readonly<{
  subscribe(callback: (payload: Payload) => void): void;
  unsubscribe(callback: (payload: Payload) => void): void;
}>;

type Sub<Payload> = Readonly<{
  send(payload: Payload): void;
}>;

type AppPorts = Readonly<{
  demandName: Cmd<string>;
  receiveName: Sub<string>;
}>;

type App = Readonly<{
  ports: AppPorts;
}>;
