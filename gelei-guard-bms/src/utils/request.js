import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import sign from './sign'
import { SILENCE_API_WHITE_LIST } from './api_features'

// 全局配置
axios.defaults.headers['transfer-req'] = process.env.TRANSFER_REQ
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['charset'] = 'utf-8'

const cancelTokenMap = {}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30 * 1000 // 请求超时时间
})

service.interceptors.response.use(
  (response) => {
    try {
      console.groupCollapsed(`api：${response.config.url}`)
      console.group('request：')
      console.log(JSON.stringify(JSON.parse(response.config.data), null, 2))
      console.groupEnd()
      console.group('response：')
      console.log(JSON.stringify(response.data, null, 2))
      console.groupEnd()
      console.groupEnd()
      // eslint-disable-next-line no-empty
    } catch (e) {
      console.log(e)
    }
    return Promise.resolve(response)
  }, (error) => {
    return Promise.reject(error)
  })

// request拦截器
service.interceptors.request.use(
  config => {
    if (process.env.IS_SIGN) {
      const data = config.data || {}
      config['data'] = sign(data)
    }
    // if(config.method.toUpperCase() === 'POST') {
    //   if (!('Content-Type' in config.headers)) {
    //     config.headers['Content-Type'] = 'application/json'
    //   }
    // }
    // if (config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('multipart/form-data') !== -1 ) {
    //   delete config.headers['Content-Type']
    //   console.log('config - ', config)
    // }
    const request_key = config.method + ':' + config.url
    // 实现上一个接口还未响应  下一个接口开始请求，把上一个接口取消
    if (typeof (cancelTokenMap[request_key]) === 'function') {
      cancelTokenMap[request_key]('强制取消了请求')
    }
    config['cancelToken'] = new axios.CancelToken(function(c) {
      cancelTokenMap[request_key] = c
    })
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * status为非0是抛错 可结合自己业务进行修改
     */
    const request_key = response.config.method + ':' + response.config.url
    cancelTokenMap[request_key] = null
    const res = response.data
    if (res.status !== 0) {
      if (SILENCE_API_WHITE_LIST.indexOf(response.config.url) === -1) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }

      /*
      -: 非法的token
      -1: 通用异常，后续接口异常区分返回码
      -2: 业务异常,需要data内返回base64位图形验证码(例：登陆密码10分钟内输错5次)
      1: 登录状态已过期，请重新登录
      11: 其他客户端登录了
      2: 该设备已经被绑定啦
      3: 权限异常
      -999: 未知异常
       */
      if (res.status === 1 || res.status === 11 || res.status === 50014) {
        if (SILENCE_API_WHITE_LIST.indexOf(response.config.url) === -1) {
          MessageBox.confirm(
            '你已被登出，可以取消继续留在该页面，或者重新登录',
            '确定登出',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        }
      }
      return Promise.reject('error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    if (axios.isCancel(error)) {
      // 取消上一个请求
      console.error('cancel')
      // 中断promise链接
      return new Promise(() => {
      })
    } else {
      // console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
