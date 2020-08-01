/*
* 根据不同类型获取权限模板
*
* @param {String} ptype 权限模板类型
*  */
function getPermissionStructure(ptype) {
  let permission
  switch (ptype) {
    case '00': // 果果职工
      permission = require('../storages/permissions').PERMISSION_DATA
      break
    case '01': // 代理商
      permission = require('../storages/permissions').AGENT_PERMISSION_DATA
      break
    default:
      permission = require('../storages/permissions').PERMISSION_DATA
      break
  }
  return permission
}

module.exports = {
  getPermissionStructure
}
