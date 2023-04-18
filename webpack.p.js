const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = merge(config, {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/p" },
                { from: "public/manifest.json", to: "manifest.json", }
            ]
        }),
        new Dotenv({
            path: '.env/.env_p',
            systemvars: true
        }),
    ]
})