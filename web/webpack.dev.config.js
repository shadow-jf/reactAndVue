let config = require('./config.js');
let baseconfig = require('./webpack.base.config.js');
let path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const packageConfig = require('./package.json');
let myerror = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };
};


var devbaseconfig = {
  // context: path.resolve(__dirname, './'),
  // optimization: baseconfig.optimization,
  entry: baseconfig.entry,
  output: {
    filename: 'js/[name][hash:8].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/', //dev '/dist'//pro

  },
  devtool: config.dev.devtool,
  devServer: {
    contentBase: false,
    historyApiFallback: true,
    open: config.dev.autoOpenBrowser,
    hot: true,
    compress: true,
    host: config.dev.host,
    port: 9097,
    progress: false,
    quiet: true,
    proxy: config.dev.proxyTable,
    publicPath: config.dev.assetsPublicPath,
    watchOptions: {
      poll: false,
    },
    overlay: config.dev.errorOverlay ? {warnings: false, errors: true} : false,
  },
  mode: 'development',
  resolve: baseconfig.resolve,
  module: baseconfig.module,
  plugins: baseconfig.plugins,
  externals: {
    // 'vue': 'Vue',
    // 'vue-router' : 'VueRouter'
  },
};

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devbaseconfig.devServer.port = port;
      devbaseconfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devbaseconfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? myerror()
          : undefined,
      }));
      resolve(devbaseconfig);
    }
  });
});