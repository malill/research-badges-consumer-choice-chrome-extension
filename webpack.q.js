const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = merge(config, {
    mode: 'development',
    devtool: false,
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/staging" },
                { from: path.resolve(__dirname, "src/style"), to: path.resolve(__dirname, "dist/style") }
            ]
        }),
        new Dotenv({
            path: '.env/.env_q',
            systemvars: true
        }),
    ]
})