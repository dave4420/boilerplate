/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  globalSetup: "./src/jest.setup.ts",
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/jest.setup-after-env.ts"],
  testEnvironment: "node",
};
