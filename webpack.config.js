const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        amazon: path.resolve(__dirname, "src/content/amazon.js"),
        core: path.resolve(__dirname, "src/content/core.js"),
        service_worker: path.resolve(__dirname, "src/background/service_worker.js")
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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/popup/popup.html"),
            filename: 'popup.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/settings/settings.html"),
            filename: 'settings.html'
        }),
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