var express = require('express')
var history = require('connect-history-api-fallback')
var app = express()
var fs = require('fs')
var path = require('path')
var serveIndex = require('serve-index')
var bodyParser = require('body-parser')
var multer = require('multer')
var request = require('request')
var sha256 = require('js-sha256')
var argv = require('minimist')(process.argv.slice(2))
var __port = argv['port'] || 4002
global.env_config = argv['env_config']
var config = require('./config.js')
var utils = require('./utils.js')
utils.startup()
var history_options = {
  index: '/gelei-guard-bms/index.html'
}
app.use(history(history_options))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
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

function noderequest(TransferReq, reqParam, method, reqConType, res) {
  if (!reqParam.sign) {
    res.send({ message: 'node sign miss 1!', status: -1 })
    return
  }
  var encryptParams = compTime(reqParam.sign, reqParam)
  if (encryptParams.status === -1) {
    res.send(encryptParams)
    return
  }
  
  request({
    url: TransferReq,
    body: encryptParams,
    headers: reqConType,
    method: method,
    json: true
  }, function(error, response, data) { // 错误,响应对象,请求回来的数据
    res.send(data)
    error ? console.log(error) : '转发请求正常'
  })
}

function noderequestwithformdata(TransferReq, reqParam, method, reqConType, files, res) {
  if (!reqParam.sign) {
    res.send({ message: 'node sign miss 2!', status: -1 })
    return
  }
  var encryptParams = compTime(reqParam.sign, reqParam)
  if (encryptParams.status === -1) {
    res.send(encryptParams)
    return
  }

  var formData = {
    ...encryptParams
  }

  // 添加文件信息
  var key, file, filename, filestream
  formData['file'] = []
  if (files) {
    for (var i = 0; i < files.length; i++) {
      file = files[i]
      key = file.fieldname
      filestream = fs.createReadStream(config.UPLOAD_DIR_PATH + '/' + file.originalname)
      formData['file'].push(filestream)
      if (key in formData) {
        formData[key].push(filestream)
      } else {
        formData[key] = [filestream]
      }
    }
  }

  request({
    url: TransferReq,
    headers: reqConType,
    method: method,
    formData,
    json: true
  }, function(error, response, data) { // 错误,响应对象,请求回来的数据
    res.send(data)
    // 清理文件
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var filepath = config.UPLOAD_DIR_PATH + '/' + file.originalname
      fs.unlink(filepath, function(error) {
        if (error) {
          console.log(error)
          return false
        }
        console.log('删除文件成功')
      })
    }

    error ? console.log(error) : '转发请求正常'
  })
}

app.use('/gelei-guard-bms/api/', upload.any(), function(req, res) {
  try {
    var method = req.method.toLowerCase()
    var TransferReq = config.baseURL + req.originalUrl.split('api')[1]
    if (method === 'get') {
      // GET Request
      var reqParam = req.query
      var reqUserAgent = req.headers['user-agent']
      noderequest(TransferReq, reqParam, method, reqConType, res)
    } else if (method === 'post') {
      // POST Request
      var reqConType = req.headers['content-type']
      var reqUserAgent = req.headers['user-agent']
      var reqHeaders = {
        'Content-Type': reqConType,
        'User-Agent': reqUserAgent
      }
      var contentTypeLower = reqConType.toLowerCase()
      if (contentTypeLower.indexOf('application/json') !== -1) {
        // json
        var reqParam = req.body
        // res.send({status: -1, message: reqParam, TransferReq})
        noderequest(TransferReq, reqParam, method, reqHeaders, res)
      } else if (contentTypeLower.indexOf('multipart/form-data') !== -1) {
        // form-data
        var reqParam = req.body
        Object.assign(reqParam, req.query)
        var reqFiles = req.files
        noderequestwithformdata(TransferReq, reqParam, method, reqHeaders, reqFiles, res)
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

function compTime(reqsign, params) {
  delete params.sign
  const reqStamp = reqsign.substring(0, 13)
  const currentTime = +new Date()
  const timediff = currentTime - reqStamp
  if (timediff > 0 && (timediff / 1000) > 10) {
    console.log(timediff / 1000)
    return { message: 'node sign miss 2!', status: -1 }
  }
  console.log('确认' + reqsign)
  console.log(getSign(reqStamp, true, params))
  console.log(params)
  if (reqsign !== getSign(reqStamp, true, params)) {
    return { message: 'node sign error!', status: -1 }
  }
  return getSign(currentTime, false, params)
}

function getSign(timeStamp, compSign, params) {
  // 只用于签名的参数
  const otherParams = {
    timeStamp: '' + timeStamp,
    token: '27688ab70a56db714b59a6ebc79b8509a1f81629ce8edc743e1bc23e24465735'
  }
  const allParams = Object.assign({}, params, otherParams)
  // 排序
  const arr = Object.values(allParams)
  // 参数值是数组，处理方法
  arr.forEach((element, i) => {
    if (Array.isArray(element)) {
      arr[i] = JSON.stringify(deepSort(element))
    }
  })
  arr.sort()
  // 加密
  const str = arr.join('')
  console.log(111111111111111111111111111)
  console.log(str)
  const sign = sha256(str)
  // 返回所有参数
  const mergeSign = timeStamp + sign
  const p = Object.assign({}, params, { 'sign': mergeSign })
  return compSign ? mergeSign : p
}

function deepSort(source) {
  if (!source || typeof source !== 'object') {
    return source
  }
  var targetObj = source.constructor === Array ? [] : {}
  if (source.constructor !== Array) {
    const newKeys = Object.keys(source).sort()
    for (var i = 0; i < newKeys.length; i++) {
      // 遍历newkey数组
      targetObj[newKeys[i]] = source[newKeys[i]]
      // 向新创建的对象中按照排好的顺序依次增加键值对
    }
  }
  for (var keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepSort(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

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
