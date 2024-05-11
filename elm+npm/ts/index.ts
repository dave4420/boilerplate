import { initAuth } from "./auth";
import { Flags, App } from "./types";

export declare namespace Elm {
  export namespace Main {
    export function init(options: {
      node?: HTMLElement | null;
      flags: Flags;
    }): App;
  }
}

const app = Elm.Main.init({
  node: document.getElementById("app"),
  flags: null,
});

initAuth(app.ports);

app.ports.demandName.subscribe((prefix: string) => {
  //app.ports.receiveName.send(prefix + "by");
});
