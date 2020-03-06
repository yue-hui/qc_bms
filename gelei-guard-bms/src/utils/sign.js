import {
  SIGN_DELTA_TIME
} from './constant'
import {
  getToken
} from '@/utils/auth'

const sha256 = require('sha256')

// 接口需要的公共参数，签名也需要
const publicParams = {
  gnw_appid: process.env.GNW_APPID,
  version: process.env.GNW_VERSION,
  source: process.env.GNW_SOURCE
}

function getSign(params) {
  const time_stamp = +new Date() + SIGN_DELTA_TIME
  // 只用于签名的参数
  const other_params = {
    timeStamp: '' + time_stamp,
    token: process.env.GNW_TOKEN
  }
  /* 判断Token有效期 */
  const app_token = getToken()
  if (app_token) {
    publicParams['app_token'] = app_token
  }
  const all_params = Object.assign({}, params, publicParams, other_params)
  /* 清掉不需要上传的字段 */
  const un_sign_fields = all_params.un_sign_fields || []
  un_sign_fields.forEach((_v, _i, _a) => {
    if (_v in all_params) {
      delete all_params[_v]
    }
  })
  if ('un_sign_fields' in all_params) {
    delete all_params.un_sign_fields
  }
  const arr = Object.values(all_params)
  // 参数值是数组，处理方法
  arr.forEach((element, i) => {
    if (Array.isArray(element)) {
      arr[i] = JSON.stringify(deepSort(element))
      // console.log(element)
    }
    // 其它类型转译成字符串类型
    if (arr[i] !== undefined) arr[i] = String(arr[i])
  })
  // 排序
  arr.sort()
  // 加密
  const str = arr.join('')
  const sign = sha256(str)
  // 返回所有参数
  const p = Object.assign({}, params, publicParams, {
    'sign': time_stamp + sign
  })
  return JSON.stringify(p)
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

// 原始版本
export default getSign
