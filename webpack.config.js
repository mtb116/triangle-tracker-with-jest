//webpack is a module bundler
//webpack loads assets, such as plugins, to run tasks such as concatenation and minification
//webpack will load anything we need for our application (JavaScript, CSS, etc) as long as we have the right loaders and plugins

const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

//webpack uses a dependency graph - recursively manage our application's assets
//webpack needs an entry point to do this - to recursively gather all the files
//entry point is like a door leading into our application - commonly called main.js
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Triangle Tracker",
      template: "./src/index.html",
      inject: "body",
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /spec/],
        loader: "eslint-loader",
      },
    ],
  },
};
