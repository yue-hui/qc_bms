import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import sign from './sign'

// 全局配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['charset'] = 'utf-8'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (process.env.IS_SIGN) {
      const data = config.data || {}
      config['data'] = sign(data)
    }
    console.log('sign config', process.env.IS_SIGN, config)
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
    const res = response.data
    if (res.status !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    
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
      return Promise.reject('error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
