const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        searchResultsPage: path.resolve(__dirname, "src/content/pages/searchResultsPage.ts"),
        productDetailPage: path.resolve(__dirname, "src/content/pages/productDetailPage.ts"),
        serviceWorker: path.resolve(__dirname, "src/background/serviceWorker.ts"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.css$/i, use: ["style-loader", "css-loader"] }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, "src/style"), to: path.resolve(__dirname, "dist/style") },
                { from: path.resolve(__dirname, "_locales"), to: path.resolve(__dirname, "dist/_locales") },
            ]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
