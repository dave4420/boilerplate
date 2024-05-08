// types adapted from elm-ts-interop

declare namespace Elm.Main {
  function init(options: { node?: HTMLElement | null; flags: Flags }): App;
}

type Flags = null;

type Cmd<Payload> = {
  subscribe(callback: (payload: Payload) => void): void;
  unsubscribe(callback: (payload: Payload) => void): void;
};

type Sub<Payload> = { send(payload: Payload): void };

interface App {
  ports: {
    demandName: Cmd<string>;
    receiveName: Sub<string>;
  };
}

const app = Elm.Main.init({
  node: document.getElementById("elm"),
  flags: null,
});

app.ports.demandName.subscribe((prefix) => {
  app.ports.receiveName.send(prefix + "by");
});
