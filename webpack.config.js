const path = require("path");

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./assets/js/index.js"],
    post: ["@babel/polyfill", "./assets/js/post.js"],
    login: ["@babel/polyfill", "./assets/js/login.js"],
    signup: ["@babel/polyfill", "./assets/js/signup.js"],
    update: ["@babel/polyfill", "./assets/js/update.js"]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  mode: "development"
};
