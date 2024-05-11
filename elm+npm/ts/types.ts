// types adapted from elm-ts-interop

declare namespace Elm.Main {
  function init(options: { node?: HTMLElement | null; flags: Flags }): App;
}

export type Flags = null;

export type Cmd<Payload> = Readonly<{
  subscribe(callback: (payload: Payload) => void): void;
  unsubscribe(callback: (payload: Payload) => void): void;
}>;

export type Sub<Payload> = Readonly<{
  send(payload: Payload): void;
}>;

export type AppPorts = Readonly<{
  demandName: Cmd<string>; // DAVE: rm
  signIn: Cmd<SignInParams>;
  signOut: Cmd<null>;
  receivedIdToken: Sub<ActiveUser>;
  receivedAuthToken: Sub<string>;
  failedToSignIn: Sub<null>;
  signedOut: Sub<null>;
}>;

export type SignInParams = Readonly<{
  emailAddress: string;
  password: string;
}>;

export type ActiveUser = Readonly<{
  forename: string;
}>;

export type App = Readonly<{
  ports: AppPorts;
}>;
