'use strict'

const path = require('path')
const os = require('os');
//获取本地IP
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

// 按需打包目录
let pArr = JSON.parse(process.env.npm_config_argv).original;

var page = "";

pArr.forEach((v, index) => {
    if (v.indexOf('page') > -1) {
        page = v.split('=')[1];
    }
});


module.exports = {
    //开发环境配置
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'https://www.baidu.com',
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/'
                }
            }
        },
        host: getIPAdress(),
        port: 9097,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
    },

    build: {
        // 编译配置
        index: path.resolve(__dirname, './dist/index.html'),
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}