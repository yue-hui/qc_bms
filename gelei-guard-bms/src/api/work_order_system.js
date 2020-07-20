import request from '@/utils/request'

/*
* 工单系统
*  */

// 工单列表接口
export function get_work_orders(data) {
  return request({
    url: '/greenguard/manager/ticket/list',
    method: 'post',
    data
  })
}

// 模糊查询已经创建工单名称
export function query_manager_ticket_title(data) {
  return request({
    url: '/greenguard/manager/ticket/title/query',
    method: 'post',
    data
  })
}

// 根据手机号码查询家长信息
export function query_patriarch_details_by_phone(data) {
  return request({
    url: '/greenguard/manager/ticket/patriarch/detail',
    method: 'post',
    data
  })
}

// 创建工单
export function create_work_order(data) {
  return request({
    url: '/greenguard/manager/ticket/save',
    method: 'post',
    data
  })
}

// 工单信息
export function query_ticket_info(data) {
  return request({
    url: '/greenguard/manager/ticket/info',
    method: 'post',
    data
  })
}

// 工单关联用户 01处理人 02@我的人 03转交过的用户
export function query_users_by_associated_type(data) {
  return request({
    url: '/greenguard/manager/ticket/associated/user',
    method: 'post',
    data
  })
}

// 最新消息
export function query_user_last_ticket_message(data) {
  return request({
    url: '/greenguard/manager/ticket/last/message',
    method: 'post',
    data
  })
}

/* 工单标签列表 */

// 多级联动 - 新增
export function add_work_order_tag(data) {
  return request({
    url: '/greenguard/manager/ticket/type/add',
    method: 'post',
    data
  })
}

// 逐级获取多级联动
export function get_work_order_tags_by_cascade(data) {
  return request({
    url: '/greenguard/manager/ticket/type/list',
    method: 'post',
    data
  })
}

// 多级联动-编辑
export function edit_work_order_tag(data) {
  return request({
    url: '/greenguard/manager/ticket/type/edit',
    method: 'post',
    data
  })
}
