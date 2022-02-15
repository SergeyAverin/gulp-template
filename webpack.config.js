module.exports = {
  mode: "development",
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
};
