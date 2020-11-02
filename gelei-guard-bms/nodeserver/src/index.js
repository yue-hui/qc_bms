var express = require('express')
var history = require('connect-history-api-fallback')
var app = express()
var path = require('path')
var serveIndex = require('serve-index')
var bodyParser = require('body-parser')
var multer = require('multer')
var argv = require('minimist')(process.argv.slice(2))
var __port = argv['port'] || 4002
global.env_config = argv['env_config']
var config = require('./config.js')
var utils = require('./utils.js')
var tools = require('./cube/tools')
var nodeRequest = tools.nodeRequest
var nodeRequestWithFormData = tools.nodeRequestWithFormData
var compTime = tools.compTime
var getSign = tools.getSign
var deepSort = tools.deepSort
var common = require('./cube/common')
var getClienIp = common.getClienIp

var permission_router = require('./routes/permission')

utils.startup()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var history_options = {
  index: '/gelei-guard-bms/index.html'
}
app.use(history(history_options))

// 处理静态文件内容的
app.use(express.static(path.resolve('./static/')))

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.UPLOAD_DIR_PATH)
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage })

/* 用户权限APP */
app.use('/gelei-guard-bms/api/ns-permission', permission_router)

/* 格雷盒子后台 */
app.use('/gelei-guard-bms/api/', upload.any(), function(req, res) {
  // Proxy Request Header
  var reqConType = req.headers['content-type']
  var reqUserAgent = req.headers['user-agent']
  var reqXForwardedFor = getClienIp(req)
  var reqXRealIP = req.headers['x-real-ip']
  var reqHeaders = {
    'Content-Type': reqConType,
    'User-Agent': reqUserAgent,
    'X-Forwarded-For': reqXForwardedFor,
    'X-Real-IP': reqXRealIP
  }
  // console.log('request headers: ', reqHeaders)
  try {
    var method = req.method.toLowerCase()
    var TransferReq = config.baseURL + req.originalUrl.split('api/')[1]
    // var TransferReq = config.baseURL + req.originalUrl.split('greenguard')[1]
    if (method === 'get') {
      // GET Request
      var reqParam = req.query
      nodeRequest(TransferReq, reqParam, method, reqHeaders, res).then(function(data) {
        res.send(data)
      })
    } else if (method === 'post') {
      var contentTypeLower = reqConType.toLowerCase()
      if (contentTypeLower.indexOf('application/json') !== -1) {
        // json
        var reqParam = req.body
        // res.send({status: -1, message: reqParam, TransferReq})
        nodeRequest(TransferReq, reqParam, method, reqHeaders, res).then(function(data) {
        res.send(data)
        })
      } else if (contentTypeLower.indexOf('multipart/form-data') !== -1) {
        // form-data
        var reqParam = req.body
        Object.assign(reqParam, req.query)
        var reqFiles = req.files
        nodeRequestWithFormData(TransferReq, reqParam, method, reqHeaders, reqFiles, res)
      } else {
        // 非法请求
        res.send({ status: -1, message: 'unrecognized content-type: ' + reqConType, code: 10000 })
      }
    } else {
      // PUT DELETE etc.
      res.send({ status: -1, message: 'node server not support http method: ' + method })
    }
  } catch (err) {
    console.log(err)
  }
})

// 支持History模式，找不到URL时全局匹配到gelei-guard-bms
app.use('^/', function(req, res, next) {
  //这里就是生成你默认页面的代码
  //下面这句的意思是用一个叫做index的模板生成页面
  const base_path = '/gelei-guard-bms/'
  res.redirect(base_path)
})

app.listen(__port, function() {
  console.log('http://localhost:' + __port)
})
