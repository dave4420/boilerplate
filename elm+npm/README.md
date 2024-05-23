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

## Authentication

…is completely faked. Hardcoded credentials are:

- email `alice@example.com`, password `123456`
- email `bob@example.com`, password `Milch`

Assumption is that we would want to use an existing Javascript library
for authentication (e.g. Amplify), so the fake auth code is on the
Typescript side, while the auth code on the Elm side isn’t fake and
shouldn’t need changing much.

## TODO

- write a build script
  - rename static assets (all deployed files except index.html) after
    their hash, so they can be cached forever by the client
- add linting (for both Typescript and Elm)
- write component tests
- add centralised loader state machine
- add routing (turn it into a single page app)
- write visual tests (golden tests using screenshots)

## Out of scope

- styling; options include
  - external CSS (e.g. using sass)
  - inline CSS
  - dynamically building a stylesheet using elm-css
  - using elm-ui instead of HTML and CSS
- end to end tests (using e.g. Cypress or Playwright)
- feature flags
