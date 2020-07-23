import request from '@/utils/request'

/*
* 工单系统
*  */

// 统计最新未读消息总数
export function get_user_recently_status(data) {
  return request({
    url: '/greenguard/manager/ticket/message/unreadCount',
    method: 'post',
    data
  })
}

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

// 更新工单 、重新打开工单、关闭工单
export function update_work_order(data) {
  return request({
    url: '/greenguard/manager/ticket/update',
    method: 'post',
    data
  })
}

// 转交工单
export function transfer_work_order(data) {
  return request({
    url: '/greenguard/manager/ticket/change/record/save',
    method: 'post',
    data
  })
}

// 添加评论
export function add_work_order_comment(data) {
  return request({
    url: '/greenguard/manager/ticket/comment/add',
    method: 'post',
    data
  })
}

// 评论列表
export function query_work_order_comments(data) {
  return request({
    url: '/greenguard/manager/ticket/comment/list',
    method: 'post',
    data
  })
}

// 更新我受理工单的评论
export function update_assigned_work_order_comment(data) {
  return request({
    url: '/greenguard/manager/ticket/update/assigned',
    method: 'post',
    data
  })
}

// 变更历史
export function manager_ticket_change_records(data) {
  return request({
    url: '/greenguard/manager/ticket/change/record',
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

// 历史关联工单
export function manager_ticket_associated_list(data) {
  return request({
    url: '/greenguard/manager/ticket/associated/list',
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
