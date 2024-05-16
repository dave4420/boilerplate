/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  globalSetup: "./src/jest.setup.ts",
  preset: "ts-jest",
  testEnvironment: "node",
};