'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')  // eslint-disable-line

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/gelei-guard-bms/api/ns-permission/*': { // 这里是公共部分，在调用接口时后面接不相同的部分
        target: 'http://localhost:4004', // 本地开发
        // target: 'http://172.168.50.134:4004/', // 开发服务器
        // target: 'http://172.168.50.124:4004/', // 测试服务器
        // target: 'http://172.168.50.143:4004/', // 测试2服务器
        // target: 'https://ms.gwchina.cn:4004', // 线上环境
        changeOrigin: true,
        secure: false,
        pathRewrite: { // 重命名
          '^/': '/'
        }
      },
      '/gelei-guard-bms/api': { // 这里是公共部分，在调用接口时后面接不相同的部分
        // target: 'https://msdev.dev.zhixike.net/', // 开发
        target: 'http://localhost:4004', // 本地开发
        // target: 'http://172.168.50.134:4004/', // 开发
        // target: 'http://172.168.50.58:12720', // 这里写的是访问接口的域名和端口号
        // target: 'https://mstes.dev.zhixike.net/', // 测试
        // target: 'https://g8dtes2.dev.zhixike.net/', // 测试 2
        // target: 'https://ms.gwchina.cn/', // 线上环境
        changeOrigin: true,
        ws: false,
        secure: false,
        pathRewrite: { // 重命名
          // '^/gelei-guard-bms/api': '/'
        }
      }
    },

    // Various Dev Server settings
    host: process.env.HOST || '0.0.0.0', // can be overwritten by process.env.HOST
    port: 9528, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-source-map',

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../nodeserver/static/gelei-guard-bms/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../nodeserver/static/gelei-guard-bms/'),
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: '/gelei-guard-bms/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
