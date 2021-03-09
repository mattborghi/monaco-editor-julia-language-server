const webpack = require("webpack");
const path = require("path");
const APP_DIR = path.resolve(__dirname, "./src");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");
const { devMiddleware } = require("./serve.config");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");


module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      vscode: require.resolve("monaco-languageclient/lib/vscode-compatibility"),
    },
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      "crypto-browserify": false,
      os: false,
    },
  },
  devServer: {
    open: true,
    // https: true,
    inline: true,
    host: "0.0.0.0",
    port: 8080,
  },
  module: {
    rules: [
      {
        // Load babel loader. To understand js in all browsers
        test: /\.(js|jsx)$/,
        exclude: /node_modules|vendor/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // Find all the html and minimize them
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        // Load file loader. To understand all image files
        test: /\.(png|ico|svg|jpg|jpeg|gif|pdf)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        // Load packages to scss files
        test: /\.(scss|css)$/,
        include: APP_DIR,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ["style-loader", "css-loader"],
      },
      {
        // Now monaco editor asks for it
        test: /\.ttf$/,
        use: ["file-loader"],
      },
      // exclude source map for now
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: "pre",
      //   use: ["source-map-loader"],
      //   exclude: [helpers.root("node_modules/monaco-languageclient")],
      // },
    ],
  },
  plugins: [
    // In order to make the Language Server work
    // https://github.com/webpack/changelog-v5/issues/10#issuecomment-615877593
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
    // The first plugin we load is for webpack to copy to dist the html file
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./src/images/logo.ico",
    }),
    // This plugin will make sure css and sass files are included in the production build
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new MonacoWebpackPlugin({
      languages: ["julia"],
    }),
  ],
};