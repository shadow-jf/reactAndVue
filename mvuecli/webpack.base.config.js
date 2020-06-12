let webpack = require('webpack');//引入webpack模块
let HtmlWebpackPlugin = require('html-webpack-plugin');//编译html
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除上次编译
const VueLoaderPlugin = require('vue-loader/lib/plugin');// Vueloader，vue模块解析
let MinCssExtractPlugin = require('mini-css-extract-plugin');//提取,压缩css
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');// 压缩，拆分js
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//优化压缩css
let TerserPlugin = require('terser-webpack-plugin');//webpack4 压缩优化

let path = require('path');
//资源路径
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
//获取命令行参数:  cnpm start --page=vue 可获取到参数 page是Vue
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

module.exports = {
    entry: `./src/${page}/index.js`,//入口
    output: {//输出
        filename: 'js/[name][hash:8].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/' 

    },
    //优化
    optimization: {
        runtimeChunk: {
            "name": "manifest"
        },
        splitChunks: {
            cacheGroups: {//加快编译
                default: false,
                vendors: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true,
                    priority: 10,
                    name: 'vendor'
                },//公共模块提取
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
        extensions: ['.js', '.vue', '.jsx', '.json', '.styl'],//文件类型
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        //模块解析
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV == "development" ? 'vue-style-loader' : MinCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader"
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    process.env.NODE_ENV == "development" ? 'vue-style-loader' : MinCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader",
                    'stylus-loader'
                ]
            },
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader'},'lazyload-loader'],
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
                    loader: 'image-webpack-loader'
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
        new CleanWebpackPlugin(),//清理每次编译的结果
        new webpack.DefinePlugin({//定义webpack全局变量
            "__img": "22222"
          }),
        new VueLoaderPlugin(),//Vue模块解析
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
        new MinCssExtractPlugin({//压缩抽离css
            filename: "css/[name].[contenthash].css"
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ]
}