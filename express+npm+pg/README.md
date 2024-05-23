# express+npm+pg boilerplate

Boilerplate for a REST API server, using Typescript and Express, with a
dedicated Postgres database.

I’ve never actually used Express professionally — I’ve built REST APIs
in Typescript using serverless (Lambda and API Gateway under the hood),
and serverful REST APIs in other languages (e.g. in Scala using Akka HTTP).

Using:

- Node
- Typescript
- Postgres
- Express
- Orval, for generating code from the OpenAPI schema… I’m not happy with
  this, it seems designed for use on the client rather than the server,
  or maybe I just need to dig deeper into how to configure it
- Migrate, for migrating the Postgres schema; chosen because I’ve used
  it before and am familiar with it, although it feels like it’s worth
  experimenting with something like [pgroll][]

[pgroll]: https://github.com/xataio/pgroll

## Prerequisites

- NVM installed and configured to pay attention to `.nvmrc`
- Docker installed

## Commands

- `npm ci` — install dependencies (sandboxed), produce generated code
- `npm run dev` — run the server locally, using a temporary in-memory Postgres
- `npm test` — run tests
- `npm run test:watch` — run tests, rerun them when the code / tests /
  API schema is changed
- `npm run typecheck:watch` — typecheck code (including tests),
  retypecheck when the code / tests / API schema is changed

## TODO

- build a docker image for production
- add linting (eslint)
- add autoformatting (prettier)
- autogenerate API client bindings to use from tests
- improve API server bindings, whether with orval or something else
- restart dev server / rerun tests when the Postgres schema changes
- add PR check for Postgres migrations being added out of order
