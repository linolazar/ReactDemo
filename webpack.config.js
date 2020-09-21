const colors = require('colors');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var isDebugBuild = process.argv.indexOf('-d') !== -1;
var buildMode = isDebugBuild === true ? 'development' : 'production';

module.exports = {
    mode: buildMode,
    entry: './src/app/app.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.ts',
            '.tsx',
            '.js',
            '.less',
            '.css',
            '.json'
        ]
    },
    // below code is used to create a seperate chunk for localy installed libraries(node_modules) folder
    // this chunk which will be shared for all other files in the output. helps to reduce bundle size.
    // in webpack 4, this helps to minify output js in browser while in production mode.
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'template.html',
            filename: path.resolve(__dirname, 'dist/index.html'),
            minify: {
                removeComments: false,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        })
    ]
};
console.log(colors.magenta('Build Mode : ' + buildMode.toUpperCase()));
