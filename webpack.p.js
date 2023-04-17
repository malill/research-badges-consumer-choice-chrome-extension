const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = merge(config, {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/prod" },
                { from: path.resolve(__dirname, "src/style"), to: path.resolve(__dirname, "dist/style") }
            ]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
})