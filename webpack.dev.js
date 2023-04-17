const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/dev" },
                { from: path.resolve(__dirname, "src/style"), to: path.resolve(__dirname, "dist/style") }
            ]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
})