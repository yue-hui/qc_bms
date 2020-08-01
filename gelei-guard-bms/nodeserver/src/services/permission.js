var config = require('../config')

var initPermissions = require('../storages/permissions').PERMISSION_DATA
var nodeRequest = require('../cube/tools').nodeRequest
var getPermissionStructure = require('../cube/auth').getPermissionStructure
var nodeRequestWithNewParams = require('../cube/tools').nodeRequestWithNewParams
var buildHTTPHeader = require('../cube/common').buildHTTPHeader
var patchRolesPermission = require('../cube/common').patchRolesPermission
var pagePermissionMapToGlobal = require('../cube/common').pagePermissionMapToGlobal
var Encrypt = require('../cube/secret').Encrypt
var Decrypt = require('../cube/secret').Decrypt

/*
* 获取用户权限服务
*
* @param req 请求结构体
* @param res 响应结构体
* @param next 将控制权交给下一个中间件
*  */
function getRolePermissionsService(req, res, next) {
  // var TransferReq = config.baseURL + 'manager/sysRole/info'
  var TransferReq = config.baseURL + req.originalUrl.split('ns-permission/roles/')[1]
  console.log(TransferReq)
  var method = req.method.toLowerCase()
  var reqParam = req.body
  var reqHeaders = buildHTTPHeader(req)
  var role_id = reqParam['role_id']
  var ptype = reqParam['ptype']
  if (!role_id) {
    var role_info = {
      role_id: '',
      role_name: '',
      function_list: [],
      codes: getPermissionStructure(ptype)
    }
    const ret = {
      status: 0,
      message: 'success'
    }
    ret['data'] = Encrypt(JSON.stringify(role_info))
    res.send(JSON.stringify(ret))
  } else {
    const newParams = {
      role_id: reqParam['role_id']
    }
    nodeRequestWithNewParams(TransferReq, reqParam, method, reqHeaders, res, reqParam).then(function(result) {
      var status = result.status
      if (status === 0) {
        var function_list = result.data.function_list || []
        var codes = patchRolesPermission(ptype, function_list)
        result.data.codes = codes
        result['data'] = Encrypt(JSON.stringify(result.data))
        res.send(result)
      } else {
        res.send(result)
      }
    })
  }
}


/*
* 创建或更新角色服务
*
* @param req 请求结构体
* @param res 响应结构体
* @param next 将控制权交给下一个中间件
*  */
function createOrEditRolePermissionsService(req, res, next) {
  var TransferReq = config.baseURL + req.originalUrl.split('ns-permission/roles/')[1]
  // var TransferReq = config.baseURL + 'greenguard/manager/sysRole/saveOrUpdate'
  // var TransferReq = config.baseURL + 'manager/sysRole/saveOrUpdate'
  var method = req.method.toLowerCase()
  var reqParam = req.body
  var newParams = JSON.parse(JSON.stringify(reqParam))
  var permissions = JSON.parse(Decrypt(newParams['permissions']))
  delete newParams['permissions']
  newParams = {...newParams, ...permissions}
  var function_list = newParams['function_list']
  var function_list = pagePermissionMapToGlobal(function_list)
  newParams['function_list'] = function_list
  var reqHeaders = buildHTTPHeader(req)
  nodeRequestWithNewParams(TransferReq, reqParam, method, reqHeaders, res, newParams).then(function(result) {
    res.send(result)
  })
}

module.exports = {
  getRolePermissionsService,
  createOrEditRolePermissionsService
}
