import { defineConfig } from "orval";

export default defineConfig({
  my: {
    input: {
      target: "./my.openapi.yaml",
      validation: true,
    },
    output: {
      target: "./src/gen/openapi/my.ts",
      client: "zod",
    },
  },
  health: {
    input: {
      target: "./health.openapi.yaml",
      validation: true,
    },
    output: {
      target: "./src/gen/openapi/health.ts",
      client: "zod",
    },
  },
});
