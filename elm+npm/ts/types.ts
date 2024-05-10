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
  demandName: Cmd<string>; // DAVE: rm
  signIn: Cmd<SignInParams>;
  signOut: Cmd<null>;
  receivedIdToken: Sub<ActiveUser>;
  receivedAuthToken: Sub<string>;
  failedToSignIn: Sub<null>;
  signedOut: Sub<null>;
}>;

type SignInParams = Readonly<{
  emailAddress: string;
  password: string;
}>;

type ActiveUser = Readonly<{
  forename: string;
}>;

type App = Readonly<{
  ports: AppPorts;
}>;
