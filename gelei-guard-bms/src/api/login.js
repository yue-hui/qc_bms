import request from '@/utils/request'

/* 登录 */
export function login(data) {
  const options = {
    url: '/greenguard/manager/user/login ',
    method: 'post',
    data
  }
  return request(options)
}

export function getInfo() {
  return request({
    url: '/greenguard/manager/user/detail',
    method: 'POST'
  })
}

export function logout() {
  return request({
    url: '/greenguard/manager/user/logout',
    method: 'post'
  })
}

/* 验证码 */
export function get_verify_code(data) {
  const options = {
    url: '/greenguard/common/get/verify/code',
    method: 'post',
    data
  }
  return request(options)
}
