# elm+npm boilerplate

Boilerplate for a web app frontend, using Elm and Typescript.

## Prerequisites

- NVM installed and configured to pay attention to `.nvmrc`
- bash/sed/etc installed

## Commands

- `npm ci` — install Typescript dependencies and Elm tooling (sandboxed)
- `npm run dev` — run frontend locally, installs Elm dependencies if necessary (sandboxed)
- `npm run dev:cat` — run catalogue locally, installs Elm dependencies if necessary (sandboxed)
- `npm run format` — format source code
- `npm test` — runs tests (actually… there are no tests, so this just typechecks everything for now)

## Signing in

Valid credentials are:

- email `alice@example.com`, password `123456`
- email `bob@example.com`, password `Milch`

## TODO

- write a build script
- add linting (for both Typescript and Elm)
- write component tests
- add centralised loader state machine
- add routing (turn it into a single page app)

## Out of scope

- DAVE
