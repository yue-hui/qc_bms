var sha256 = require('js-sha256')
var request = require('request')
var fs = require('fs')
var config = require('../config')

/*
* 检查参数签名是否正确
*
* @param {String} reqsign 原签名值
* @param {Object} params 签名参数
* @param {Number} currentTime 当前13位时间戳
* */
function checkedParams(reqsign, params, currentTime) {
  delete params.sign
  const reqStamp = reqsign.substring(0, 13)
  const timediff = currentTime - reqStamp
  if (timediff > 0 && (timediff / 1000) > 40) {
    console.log('request timeout: ', timediff / 1000)
    return { message: 'node sign miss 2!', status: -1 }
  }
  console.log('确认' + reqsign)
  console.log(getSign(reqStamp, true, params))
  console.log(params)
  if (reqsign !== getSign(reqStamp, true, params)) {
    return { message: 'node sign error!', status: -1 }
  }
  return { message: 'checked pass!', status: 0, currentTime }
}

/*
* 判断签名是否合法和未过期
* @param {String} reqsign 签名参数
* @param {Object} params 签名参数
* */
function compTime(reqsign, params) {
  const currentTime = +new Date()
  const result = checkedParams(reqsign, params, currentTime)
  if (result.status === 0) {
    return getSign(currentTime, false, params)
  } else {
    return result
  }
}

/*
* 参数签名
*
* @param {Number || String} timeStamp 签名时的时间戳
* @param {Number} compSign true 只返回签名 false 返回带签名的所有参数
* @param {Number} params 签名参数
* */
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
    // 其它类型转译成字符串类型
    if (arr[i] !== undefined) arr[i] = String(arr[i])
  })
  arr.sort()
  // 加密
  const str = arr.join('')
  console.log(str)
  const sign = sha256(str)
  // 返回所有参数
  const mergeSign = timeStamp + sign
  const p = Object.assign({}, params, { 'sign': mergeSign })
  return compSign ? mergeSign : p
}

/*
* 参数深度排序
*
* @param {Object} source 签名参数
* */
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

/*
* Node Request 转发接口函数
*
* @param {Object} TransferReq 转发接口的URL地址
* @param {Object} reqParam request转发参数
* @param {String} method Get、Post等请求方法
* @param {Object} headers 请求体中要转发的Headers
* @param {Object} res Http 请求头
* */
function nodeRequest(TransferReq, reqParam, method, headers, res) {
  return new Promise(function(resolve, reject) {
    if (!reqParam.sign) {
      resolve({ message: 'node sign miss 1!', status: -1 })
      return
    }
    var encryptParams = compTime(reqParam.sign, reqParam)
    if (encryptParams.status === -1) {
      resolve(encryptParams)
      return
    }

    request({
      url: TransferReq,
      body: encryptParams,
      headers: headers,
      method: method,
      json: true
    }, function(error, response, data) { // 错误,响应对象,请求回来的数据
      resolve(data)
      error ? console.log(error) : '转发请求正常'
    })
  })
}

function nodeRequestWithNewParams(TransferReq, reqParam, method, headers, res, newParams) {
  return new Promise(function(resolve, reject) {
    if (!reqParam.sign) {
      resolve({ message: 'node sign miss 1!', status: -1 })
      return
    }
    var checkRet = checkedParams(reqParam.sign, reqParam)
    if (checkRet.status === -1) {
      resolve(checkRet)
      return
    }

    var currentTime = checkRet['currentTime']
    var encryptParams = getSign(currentTime, false, newParams)

    request({
      url: TransferReq,
      body: encryptParams,
      headers: headers,
      method: method,
      json: true
    }, function(error, response, data) { // 错误,响应对象,请求回来的数据
      resolve(data)
      error ? console.log(error) : '转发请求正常'
    })
  })
}

function nodeRequestWithFormData(TransferReq, reqParam, method, headers, files, res) {
  if (!reqParam.sign) {
    res.send({ message: 'node sign miss 2!', status: -1 })
    return
  }
  var encryptParams = compTime(reqParam.sign, reqParam)
  if (encryptParams.status === -1) {
    res.send(encryptParams)
    return
  }

  r = request({
    url: TransferReq,
    headers: headers,
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

  var formData = r.form()
  for (key of Object.keys(encryptParams)) {
    formData.append(key, encryptParams[key])
  }
  // var formData = {
  //   ...encryptParams
  // }

  // 添加文件信息
  var key, file, filename, filestream
  if (files) {
    for (var i = 0; i < files.length; i++) {
      file = files[i]
      key = file.fieldname
      filestream = fs.createReadStream(config.UPLOAD_DIR_PATH + '/' + file.originalname)
      formData.append('file', filestream, { ...file })
    }
  }
}

module.exports = {
  nodeRequest,
  nodeRequestWithNewParams,
  nodeRequestWithFormData,
  compTime,
  getSign,
  deepSort
}
