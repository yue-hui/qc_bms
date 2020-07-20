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

/* 修改用户密码 */
export function modified_user_password(data) {
  return request({
    url: '/greenguard/manager/user/password/edit',
    method: 'post',
    data
  })
}

// 修改用户头像
export function update_system_account_avatar(data) {
  return request({
    url: '/greenguard/manager/user/imgUrl/update',
    method: 'post',
    data
  })
}

// 统计最新未读消息总数
export function get_user_recently_status(data) {
  return request({
    url: '/greenguard/manager/ticket/message/unreadCount',
    method: 'post',
    data
  })
}
