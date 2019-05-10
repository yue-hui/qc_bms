var fs = require('fs')
var config = require('./config.js')

function startup() {
  // 创建本地静态目录
  fs.exists(config.STATIC_PATH, function(exists) {
    if (!exists) {
      fs.mkdir(config.STATIC_PATH, function() {
      })
    }
  })
  // 创建上传文件目录
  fs.exists(config.UPLOAD_DIR_PATH, function(exists) {
    if (!exists) {
      fs.mkdir(config.UPLOAD_DIR_PATH, function() {
      })
    }
  })
}

module.exports = {
  startup
}
