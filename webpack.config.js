const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: {
        searchResultsPage: path.resolve(__dirname, "src/content/searchResultsPage.ts"),
        productDetailPage: path.resolve(__dirname, "src/content/productDetailPage.ts")
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
