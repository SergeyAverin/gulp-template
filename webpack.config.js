const webpack = require("webpack");


const MODE = process.env.GULP_TEMPLATE_MODE;

const plugins = [
  new webpack.EnvironmentPlugin({
    MODE: MODE,
  }),
];

if (MODE === "development") {
  // Development plugins
  // plugins.push(new PluginName());
}

module.exports = {
  mode: MODE === "production" ? "production" : "development",
  
  output: {
    filename: "script.min.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
    ],
  },
  plugins
};
