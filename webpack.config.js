let mode = process.env.GULP_TEMPLATE_MODE;

if (!mode) {
  mode = "production";
}

module.exports = {
  mode: mode,
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
