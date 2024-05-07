declare namespace Elm {
  type Module = any; // DAVE: improve this

  const Main: Module;
}

const main = Elm.Main.init({ node: document.getElementById("elm") });
