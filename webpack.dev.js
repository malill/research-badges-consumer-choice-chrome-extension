const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public/dev" },
                {
                    from: "public/manifest.json",
                    to: "manifest.json",
                    transform(content, _) {
                        // https://stackoverflow.com/questions/44232366/how-do-i-build-a-json-file-with-webpack/54700817#54700817
                        // copy-webpack-plugin passes a buffer
                        var manifest = JSON.parse(content.toString());
                        // make any modifications you like, such as
                        manifest.name = "Product Navigator DEV";
                        manifest.action.default_title = "Product Navigator DEV";
                        manifest.description = "Simply remove decision biases from Amazon UK search pages. (DEVELOPMENT VERSION)";
                        // pretty print to JSON with two spaces
                        return JSON.stringify(manifest, null, 2);
                    }
                }
            ]
        }),
        new Dotenv({
            path: '.env/.env_dev',
            systemvars: true
        }),
    ]
})
