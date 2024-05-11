import { ActiveUser, Ports } from "./types";

type UserEntry = Readonly<{
  password: string;
  id: ActiveUser;
  accessToken: string;
}>;

const users = new Map<string, UserEntry>([
  [
    "alice@example.com",
    {
      password: "123456",
      id: {
        forename: "Alice",
      },
      accessToken: "sgiuye",
    },
  ],
  [
    "bob@example.com",
    {
      password: "Milch",
      id: {
        forename: "Bobby",
      },
      accessToken: "ugyilou",
    },
  ],
]);

let currentUser: UserEntry | null = null;

export const initAuth = (ports: Ports): void => {
  ports.signIn.subscribe(({ emailAddress, password }) => {
    const user = users.get(emailAddress);
    if (!user || password !== user.password) {
      ports.failedToSignIn.send(null);
      return;
    }
    currentUser = user;
    ports.receivedIdToken.send(user.id);
    ports.receivedAccessToken.send(user.accessToken);
  });

  ports.signOut.subscribe(() => {
    currentUser = null;
    ports.signedOut.send(null);
  });
};
