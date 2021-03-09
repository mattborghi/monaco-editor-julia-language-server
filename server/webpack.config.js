const path = require("path");
const lib = path.resolve(__dirname, "lib");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const common = {
    entry: {
        server: path.resolve(lib, "server.js"),
    },
    output: {
        filename: "[name].bundle.js",
        path: lib,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.ttf$/,
                use: ["file-loader"],
            },
        ],
    },
    target: "node",
    // node: {
    //   fs: "empty",
    //   child_process: "empty",
    //   net: "empty",
    //   crypto: "empty",
    // },
    // resolve: {
    //     alias: {
    //         'vscode': require.resolve('monaco-languageclient/lib/vscode-compatibility')
    //     },
    //     extensions: ['.js', '.json', '.ttf']
    // }
    externals: [nodeExternals()],
};

if (process.env["NODE_ENV"] === "production") {
    module.exports = merge(common, {
        plugins: [
            // new UglifyJSPlugin(),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production"),
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            }),
        ],
    });
} else {
    module.exports = merge(common, {
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: "pre",
                    loader: "source-map-loader",
                },
            ],
        },
    });
}