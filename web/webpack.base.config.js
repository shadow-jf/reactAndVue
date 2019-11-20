let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let MinCssExtractPlugin = require('mini-css-extract-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let TerserPlugin = require('terser-webpack-plugin');

let path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let pArr = JSON.parse(process.env.npm_config_argv).original;

var page="";
var version="";

pArr.forEach((v,index) => {
    if(v.indexOf('page')>-1){
        page=v.split('=')[1];
    }

    if(v.indexOf('version')>-1){
        version=v.split('=')[1];
    }

});

// let page = JSON.parse(process.env.npm_config_argv).remain[0];

// console.log(page,process.env.npm_config_argv,998)

// if (page && page.length > 0) {
//     page = page.split('=')[1]
// }

// console.log(process.env.npm_config_argv,page,9978)

module.exports = {
    // entry: path.resolve(__dirname, `src/vue/`, 'index.js'),
    // entry: path.resolve(__dirname, `./src/${page}/`, 'index.js'),
    entry: `./src/${page}/index.js`,
    output: {
        filename: 'js/[name][hash:8].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/' //dev '/dist'//pro

    },
    optimization: {
        runtimeChunk: {
            "name": "manifest"
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true,
                    priority: 10,
                    name: 'vendor'
                },
                common: {
                    chunks: "all",
                    minChunks: 2,
                    name: 'common',
                    enforce: true,
                    priority: 5
                }
            }
        },
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
            cache: false,
            parallel: true,
            extractComments: 'all'

        }), new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    { discardComments: { removeAll: true } }
                ],
            },
            canPrint: true
        }), new TerserPlugin({
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
                compress: {
                    drop_console: process.env.NODE_ENV == "development"?false:true,
                },
            },
        })],
    },
    resolve: {
        extensions: ['.js', '.vue', '.jsx', '.json', '.styl'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: [
                    // { loader: 'style-loader', options: { insert: 'head', injectType: 'singletonStyleTag' } },
                    // MinCssExtractPlugin.loader,
                    process.env.NODE_ENV == "development" ? 'vue-style-loader' : MinCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader"
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    // MinCssExtractPlugin.loader,
                    // 'style-loader',
                    process.env.NODE_ENV == "development" ? 'vue-style-loader' : MinCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader",
                    'stylus-loader'
                ]
            },
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader'
                        // options: {
                        //     presets: [
                        //         // '@babel/preset-env',
                        //         // {
                        //         //     "targets": "> 0.25%, not dead"
                        //         // }
                        //         [
                        //             "@babel/preset-env",
                        //             {
                        //                 "targets": "> 0.25%, not dead"
                        //             }
                        //         ],
                        //         '@babel/preset-react'
                        //     ],
                        //     plugins: [
                        //         ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        //         ['@babel/plugin-proposal-class-properties', { "loose": true }],
                        //         '@babel/plugin-transform-runtime'
                        //     ]
                        // }
                },'lazyload-loader'],
                //包括
                include: path.resolve(__dirname, 'src'),
                //排除
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[hash:7].[ext]',
                        // outputPath: './../'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    // options: {
                    //     bypassOnDebug: true
                    // }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'media/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "__img": "22222"
          }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板文件
            filename: 'index.html', // 打包后生成文件
            hash: true, // 添加hash值解决缓存问题
            minify: { // 对打包的html模板进行压缩
                removeAttributeQuotes: true, // 删除属性双引号
                collapseWhitespace: true, // 折叠空行变成一行
                removeComments: true,
                removeRedundantAttributes: true,
            }
        }),
        new MinCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ],
    externals: {
        // 'vue': 'Vue',
        // 'vue-router' : 'VueRouter'
    }
}