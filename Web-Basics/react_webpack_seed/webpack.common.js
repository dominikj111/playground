const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    application: "./src/application/index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "[name].bundle.js",
    library: "[name]bundle",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        type: "javascript/auto",
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(css|scss|sass)$/,
        type: "javascript/auto",
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "ejs-webpack-loader!src/index.ejs",
      filename: "index.html",
      inject: false,
      title: "..:: getElementById Cracker ::..",
    }),
  ],
};

module.exports = config;
