'use strict';

const path = require('path');
const os = require('os');

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

var page = '';
var version = '';

pArr.forEach((v, index) => {
  console.log(v, typeof v, 88999);
  if (v.indexOf('page') > -1) {
    page = v.split('=')[1];
  }

  if (v.indexOf('version') > -1) {
    version = v.split('=')[1];
  }
});

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/',
        },
      },
    },
    host: getIPAdress(),
    port: 9097,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    devtool: 'cheap-module-eval-src-map',
    cacheBusting: true,
    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, './dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, './dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    productionSourceMap: true,
    devtool: '#src-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
