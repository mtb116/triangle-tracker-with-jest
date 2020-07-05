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
//notice how module.exports is just a big object that holds key-value pairs - it's just JavaScript!
module.exports = {
  entry: "./src/main.js",
//output - where our code will go after it is processed. We import path at the top and use it here.
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
  },

//Plugins are more powerful than loaders (below) - they modify and work on the entire bundled code
//we installed all these plugins as dependencies using npm install [dependency name] - we import(require) these at the top
//What do each of these plugins do for us?
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
//webpack is used to bundle many assets like CSS files
//the first object in this rules array deals with CSS
//test line tells webpack where to look for .css files using regex
//use line tells webpack what loaders to use for handling css - this case we are using two dependencies we added in package.json
//webpack only understands JS - we need loaders to process files like .css before the code is actually loaded 
//you could decide to use a different dependency down the line - webpack allows you configuration options!
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
