const path = require("path");

module.exports = {
  entry: "./ts/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "ts.js",
    path: path.resolve(__dirname, "dist"),
  },
};
