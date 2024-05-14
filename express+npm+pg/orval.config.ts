import { defineConfig } from "orval";

export default defineConfig({
  my: {
    input: {
      target: "./my.openapi.yaml",
      // DAVE: enable validation here
    },
    output: {
      target: "./src/gen/my-openapi-types.ts",
      client: "zod",
    },
  },
});
