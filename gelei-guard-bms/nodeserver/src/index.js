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
app.use('/api/*', function(req, res) {
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
  let reqStamp = reqsign.substring(0, 13)
  let currentTime = +new Date()
  let timediff = currentTime - reqStamp
  if (timediff > 0 && (timediff / 1000) > 10) {
    console.log(timediff / 1000)
    return { message: 'node sign miss 2!', status: -1 }
  }
  if (reqsign !== getSign(reqStamp, true, params)) {
    return { message: 'node sign error!', status: -1 }
  }
  return getSign(currentTime, false, params)
}

function getSign(timeStamp, compSign, params) {
  // 只用于签名的参数
  let otherParams = {
    timeStamp: '' + timeStamp,
    token: '27688ab70a56db714b59a6ebc79b8509a1f81629ce8edc743e1bc23e24465735'
  }
  let allParams = Object.assign({}, params, otherParams)
  // 排序
  let arr = Object.values(allParams)
  // 参数值是数组，处理方法
  arr.forEach((element, i) => {
    if (Array.isArray(element)) {
      element.sort()
      arr[i] = JSON.stringify(element)
    }
  })
  arr.sort()
  // 加密
  let str = arr.join('')
  let sign = sha256(str)
  // 返回所有参数
  let mergeSign = timeStamp + sign
  let p = Object.assign({}, params, { 'sign': mergeSign })
  return compSign ? mergeSign : p
}

const options = {
  'index': ['index.html', 'index.htm'],
  'icons': true
}

app.use('/', serveIndex(path.resolve('./static/gelei-guard-bms'), options))
// app.use('/gelei-guard-bms/', serveIndex(path.resolve('./static/gelei-guard-bms'), { 'icons': true }))
app.listen(__port, function() {
  console.log('http://localhost:' + __port)
})
