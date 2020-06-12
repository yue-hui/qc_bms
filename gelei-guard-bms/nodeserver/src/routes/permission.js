var express = require('express')
var router = express.Router()
var permissions = require('../storages/permissions')

var buildHTTPHeader = require('../cube/common').buildHTTPHeader
var getRolePermissionsService = require('../services/permission').getRolePermissionsService
var createOrEditRolePermissionsService = require('../services/permission').createOrEditRolePermissionsService
// var Encrypt = require('../cube/secret').Encrypt
// var Decrypt = require('../cube/secret').Decrypt

/* 用户权限页接口 */
router.get('/', function(req, res, next) {
  // 获取用户Token，并转发请求到后端
  // 如何后端数据用户带权限
  // res.send(JSON.stringify(permissions))
  // const origin_word = 'hello world'
  // const word = Encrypt(origin_word)
  // const other_word = Decrypt(word)
  // res.send({status: 0, message: 'permission', origin_word, word, other_word})
  res.send({status: 0, message: 'permission module'})
})

/*
* 用户角色拥有权限接口
*  */
router.post('/roles/greenguard/manager/sysRole/info', function(req, res, next) {
  var reqConType = req.headers['content-type']
  var contentTypeLower = reqConType || reqConType.toLowerCase()
  if (contentTypeLower.indexOf('application/json') !== -1) {
    var reqHeaders = buildHTTPHeader(req)
    try {
      getRolePermissionsService(req, res, next)
    } catch (err) {
      console.log(err)
    }
  } else {
    // 非法请求
    res.send({ status: -1, message: 'unrecognized content-type: ' + reqConType, code: 10000 })
  }
})

/*
* 用户角色创建页面接口
*  */
router.post('/roles/greenguard/manager/sysRole/saveOrUpdate', function(req, res, next) {
  var reqConType = req.headers['content-type']
  var contentTypeLower = reqConType || reqConType.toLowerCase()
  if (contentTypeLower.indexOf('application/json') !== -1) {
    var reqHeaders = buildHTTPHeader(req)
    try {
      createOrEditRolePermissionsService(req, res, next)
    } catch (err) {
      console.log(err)
    }
  } else {
    // 非法请求
    res.send({ status: -1, message: 'unrecognized content-type: ' + reqConType, code: 10000 })
  }
})

module.exports = router
