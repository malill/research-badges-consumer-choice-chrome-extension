const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = merge(config, {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/prod" },
                { from: path.resolve(__dirname, "src/style"), to: path.resolve(__dirname, "dist/style") }
            ]
        })
    ]
})