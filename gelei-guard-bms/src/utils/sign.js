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
  const arr = Object.values(all_params)
  // 参数值是数组，处理方法
  arr.forEach((element, i) => {
    if (Array.isArray(element)) {
      element.sort()
      arr[i] = JSON.stringify(element)
    }
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

// 原始版本
export default getSign
