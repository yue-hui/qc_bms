var page_map = require('../storages/page_map')
var permissions = require('../storages/permissions')
var getPermissionStructure = require('../cube/auth').getPermissionStructure

/*
* 构建HTTP Header
*
* @param {Object} req Web请求体
* */
function buildHTTPHeader(req) {
  var reqConType = req.headers['content-type']
  var reqUserAgent = req.headers['user-agent']
  var reqXForwardedFor = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  var reqXRealIP = req.headers['x-real-ip']
  var reqHeaders = {
    'Content-Type': reqConType,
    'User-Agent': reqUserAgent,
    'X-Forwarded-For': reqXForwardedFor,
    'X-Real-IP': reqXRealIP
  }
  return reqHeaders
}

/*
* 页面权限映射到全局
*
* @param {Array} codes 权限code数组
* */
function pagePermissionMapToGlobal(codes) {
  // 页面接口
  var _p = new Set(codes)
  const PAGE_MAPPER = JSON.parse(JSON.stringify(page_map.PAGE_MAPPER))
  // 授权接口
  for (var i = 0; i < codes.length; i++) {
    var code = codes[i] + ''
    var _curr = PAGE_MAPPER[code]
    // console.log(_curr, code)
    for (var j = 0; j < _curr.length; j++) {
      _p.add(_curr[j])
    }
    PAGE_MAPPER[+code].map(r => {
      _p.add(r)
    })
  }
  // 公共接口
  var _public = PAGE_MAPPER['public']
  for (var k = 0; k < _public.length; k++) {
    // 筛选多余权限
    if ([1, 2].indexOf(parseInt(_public[k] / 10000)) !== -1) {
      _p.add(_public[k])
    }
    // _p.add(_public[k])
  }
  return Array.from(_p)
}

/*
* 给用户页面patch权限
*
* @param {Array} page_code 页面权限ID列表
* */
function patchRolesPermission(ptype, page_code) {
  function __analysis_page_structure(auth_list) {
    auth_list.map(r => {
      const { name, code, children } = r
      if (page_code.indexOf(String(code)) !== -1) {
        r.checked = true
        // console.log('code: ', code, name)
      } else {
        r.checked = false
      }
      if (children.length) {
        __analysis_page_structure(children)
      }
    })
  }

  var permission_template = getPermissionStructure(ptype)
  var permission_data = JSON.parse(JSON.stringify(permission_template))
  __analysis_page_structure(permission_data)
  return permission_data
}

/*
* 获取客户端
*
* @param {Object} req Web请求体
*  */
function getClienIp(req) {
  // req.headers['x-forwarded-for'] || req.connection.remoteAddress
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
}

module.exports = {
  buildHTTPHeader,
  patchRolesPermission,
  pagePermissionMapToGlobal,
  getClienIp
}
