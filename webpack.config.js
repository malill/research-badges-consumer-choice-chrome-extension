const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        amazon: path.resolve(__dirname, "src/content/amazon/v2/index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: [
            { test: /\.css$/i, use: ["style-loader", "css-loader"] }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public" },
                { from: path.resolve(__dirname, "src/style"), to: path.resolve(__dirname, "dist/style") }
            ]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};