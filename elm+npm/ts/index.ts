import "./types";

const app = Elm.Main.init({
  node: document.getElementById("app"),
  flags: null,
});

app.ports.demandName.subscribe((prefix) => {
  //app.ports.receiveName.send(prefix + "by");
});
