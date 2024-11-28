const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@context": path.resolve(__dirname, "src/context/"),
      "@forms": path.resolve(__dirname, "src/forms/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
    },
    extensions: [".tsx", ".ts", ".js"],
    mainFiles: ["index"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DotenvWebpackPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    hot: true,
    port: 8787,
    open: true,
  },
  mode: "development",
};
