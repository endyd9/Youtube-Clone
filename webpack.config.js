const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const JSBASE_URL = "./src/client/js/";

module.exports = {
  entry: {
    main: JSBASE_URL + "main.js",
    videoPlayer: JSBASE_URL + "videoPlayer.js",
    recorder: JSBASE_URL + "recorder.js",
    commentSection: JSBASE_URL + "commentSection.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
  mode: "development",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
