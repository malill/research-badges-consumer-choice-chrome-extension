const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        content: path.resolve(__dirname, "src/content/content.ts"),
        service_worker: path.resolve(__dirname, "src/background/service_worker.ts")
},
    output: {
    path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
resolve: {
    extensions: [".ts", ".js"],
    },
module: {
    rules: [
        { test: /\.css$/i, use: ["style-loader", "css-loader"] },
        {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        },
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