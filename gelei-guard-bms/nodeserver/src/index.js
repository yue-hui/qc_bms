var express = require('express')
var app = express()
var path = require('path')
var serveIndex = require('serve-index')
var bodyParser = require('body-parser')
var request = require('request')
var sha256 = require('js-sha256')
var argv = require('minimist')(process.argv.slice(2))
var __port = argv['port'] || 4002
global.env_config = argv['env_config']
var config = require('./config.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve('./static')))
app.use('/gelei-guard-bms/api/*', function(req, res) {
  try {
    var method = req.method.toLowerCase()
    var reqConType = req.headers['content-type']
    var reqParam = null
    // var TransferReq = req.headers['transfer-req'] || 'https://msdev.dev.zhixike.net/greenguard'
    var TransferReq = config.baseURL
    if (method === 'get') {
      reqParam = req.query
      TransferReq = TransferReq + req.originalUrl.split('api')[1]
      noderequest(TransferReq, reqParam, method, reqConType, res)
    } else if (method === 'post' || method === 'options') {
      reqParam = req.body
      TransferReq = TransferReq + req.baseUrl.split('api')[1]
      noderequest(TransferReq, reqParam, method, reqConType, res)
    } else {
      res.send({
        status: -1,
        message: 'node 请求方式错误'
      })
    }
  } catch (err) {
    console.log(err)
  }
})

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

const options = {
  'index': ['index.html', 'index.htm'],
  'icons': true
}

app.use('/', serveIndex(path.resolve('./static'), options))
app.use('/gelei-guard-bms/*', function(req, res) {
  // 处理history模式时找不到URL的情况
  const base_path = '/gelei-guard-bms'
  if (req.baseUrl.indexOf(base_path) !== -1) {
    res.redirect(base_path)
  }
})
app.listen(__port, function() {
  console.log('http://localhost:' + __port)
})
