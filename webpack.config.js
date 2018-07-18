var debug = process.env.NODE_ENV !== "production";
//debug = false;
var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/client.js",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    allChunks: true,
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader"},
                        {
                            loader: "less-loader",
                            options: {
                                includePaths: ["./src/less/", "./css/"]
                            }
                        },
                    ]
                })
            }
        ],
        /*rules: [

        ]*/
    },
    output: {
        path: __dirname + "/src/",
        filename: "client.min.js"
    },
    plugins: debug ? [
            new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
            new ExtractTextPlugin({
                filename: 'some.css',
                allChunks: true,
            })
        ] :
        [
            new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
            new ExtractTextPlugin("styles.css"),
            new ExtractTextPlugin({
                filename: 'styles.css',
                allChunks: true,
            })
        ],
};
