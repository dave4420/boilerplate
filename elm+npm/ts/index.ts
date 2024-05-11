import { Elm } from "./types";
import { initAuth } from "./auth";

const app = Elm.Main.init({
  node: document.getElementById("app"),
  flags: null,
});

initAuth(app.ports);

app.ports.demandName.subscribe((prefix: string) => {
  //app.ports.receiveName.send(prefix + "by");
});
