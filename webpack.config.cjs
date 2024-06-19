const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const DotenvPlugin = require("webpack-dotenv-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin-next");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  plugins: [
    new NodePolyfillPlugin(),
    new DotenvPlugin({
      sample: "./.env",
      path: "./.env",
    }),
    new webpack.ContextReplacementPlugin(/express|bcrypt|node\-pre\-gyp/),
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ["pnpm run:dev"],
        blocking: false,
        parallel: true,
      },
    }),
  ],
  entry: "./src/index.ts",
  mode: NODE_ENV,
  watch: NODE_ENV === "development",
  externals: [
    nodeExternals(),
    { 'bcrypt': 'commonjs bcrypt' }
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    mainFields: ["browser", "module", "main"],
    fallback: {
      net: false,
      tls: false,
      browser: false,
      child_process: false,
      dns: false,
      nock: false,
      "aws-sdk": false,
      "mock-aws-s3": false,
      async_hooks: false,
      npm: false,
      "node-gyp": false,
    },
  },
};
