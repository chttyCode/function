
const path = require("path");
const webpack = require("webpack");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const env = 'development'
module.exports= {
    mode: env,
    entry: "./src/skeleton.tsx",
    output: {
      filename: "skeleton.js",
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, "../skeleton")
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json", ".scss", ".jsx", ".svg"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            env == "development" ? "style-loader" : miniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader"
          ]
        },
        {
          test: /\.less$/,
          use: [
            env == "development" ? "style-loader" : miniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(jpe?g|png|gif|mp4|mp3)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 1 * 1024,
              name: "images/[hash].[ext]"
            }
          }
        },
        {
          test: /\.tsx?$/,
          loader: "eslint-loader",
          enforce: "pre",
          include: [path.join(__dirname, "../src")],
          options: {
            fix: true
          }
        }
      ]
    },
    plugins: [
      env !== "development" &&
        new miniCssExtractPlugin({
          filename: "[name].[hash].css"
        }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "../public/index.html")
      }),
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
    ].filter(Boolean)
  };