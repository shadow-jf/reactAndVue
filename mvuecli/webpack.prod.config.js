let config = require('./config.js');
let baseconfig = require('./webpack.base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

baseconfig.plugins.push(new BundleAnalyzerPlugin());//监听编译后的配置

module.exports = {
    optimization: baseconfig.optimization,
    entry: baseconfig.entry,
    output: {
        filename: 'js/[name][hash:8].js',
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath //dev '/dist'//pro
    },
    mode: 'production',
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    resolve: baseconfig.resolve,
    module: baseconfig.module,
    plugins: baseconfig.plugins,
    externals: {
        // 'vue': 'Vue', //Vue不参与编译，以cnd的形式引入
        // 'vue-router' : //VueRouter不参与编译，以cnd的形式引入
    }
}