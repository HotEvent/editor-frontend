const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        editor: './src/editor/editor.ts',
        layout: './src/layout/layout.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.PUBLIC_URL": JSON.stringify(".") }),
        new HtmlWebpackPlugin({
            title: 'layout',
            filename:'index.html',
            chunks:['layout'],
            template: './src/layout/layout.html',
        }),
        new HtmlWebpackPlugin({
            title: 'editor',
            filename:'editor.html',
            chunks:['editor'],
            template: './src/editor/editor.html',
        })
    ],
};