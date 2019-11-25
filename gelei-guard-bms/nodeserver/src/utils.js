var fs = require('fs')
var dayjs = require('dayjs')
var config = require('./config.js')
var nodemon = require('nodemon')

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

function kibanaLog(level, message) {
  // [日志级别] 时间 [,,] [线程] [运行的类] [运行环境.项目名称] - 日志正文
  const now_time = dayjs().format("YYYY-MM-DD HH:mm:ss")
  const process_name = `${ process.title }-${ process.pid }`
  const runtime_class = 'bms server'
  const runtime_meta = process.env.env_config + ' ' + 'gelei-guard-bms'
  console.log('====', process_name, runtime_meta, process.argv, nodemon.env)
}

module.exports = {
  startup,
  kibanaLog
}
