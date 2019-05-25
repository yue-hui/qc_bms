import request from '@/utils/request'

/*
* 公共接口
*  */

// 获取订单类型列表
export function get_order_type_list() {
  return request({
    url: '/greenguard/common/order/type/list',
    method: 'post'
  })
}

// 获取订单状态列表
export function get_order_status_list() {
  return request({
    url: '/greenguard/common/order/status/list',
    method: 'post'
  })
}

// 获取订单状态列表
export function get_order_paytype_list() {
  return request({
    url: '/greenguard/common/order/paytype/list',
    method: 'post'
  })
}

// 获取广告类型列表
export function get_advertising_type_list() {
  return request({
    url: '/greenguard/common/advertising/type/list',
    method: 'post'
  })
}

// 获取广告位置列表
export function get_advertising_point_list() {
  return request({
    url: '/greenguard/common/advertising/point/list',
    method: 'post'
  })
}

/*
* 用户信息管理
*  */

// 获取家长用户列表
export function get_parent_list(data) {
  return request({
    url: '/greenguard/manager/user/patriarch/list',
    method: 'post',
    data
  })
}

// 用户信息管理 - 获取家长详情信息
export function get_parent_details(data) {
  return request({
    url: '/greenguard/manager/user/patriarch/detail',
    method: 'post',
    data
  })
}

// 用户信息管理 - 获取孩子设备操作（绑定或解绑）记录
export function get_child_record_details(data) {
  return request({
    url: '/greenguard/manager/user/patriarch/child_device/record/list',
    method: 'post',
    data
  })
}

// 获取设备信息列表
export function get_device_list(data) {
  return request({
    url: '/greenguard/manager/device/info/list',
    method: 'post',
    data
  })
}

/*
* 常见问题管理
*  */

// 获取常见问题列表
export function get_questions_list(data) {
  return request({
    url: '/greenguard/manager/qa/list',
    method: 'post',
    data
  })
}

// 创建常见问题
export function add_questions(data) {
  return request({
    url: '/greenguard/manager/qa/add',
    method: 'post',
    data
  })
}

// 编辑常见问题
export function update_questions(data) {
  return request({
    url: '/greenguard/manager/qa/edit',
    method: 'post',
    data
  })
}

// 常见问题详情
export function get_questions_details(data) {
  return request({
    url: '/greenguard/manager/qa/detail',
    method: 'post',
    data
  })
}

// 删除常见问题
export function delete_questions(data) {
  return request({
    url: '/greenguard/manager/qa/delete',
    method: 'post',
    data
  })
}

/*
* 用户数据分析
*  */

// 用户分析整体情况
export function get_user_analysis_summary(data) {
  return request({
    url: '/greenguard/manager/user/analyze/summary',
    method: 'post',
    data
  })
}

// 家长端详细数据列表
export function get_user_analysis_details(data) {
  return request({
    url: '/greenguard/manager/user/analyze/list',
    method: 'post',
    data
  })
}

// 孩子端详细数据列表
export function get_user_analysis_child_details(data) {
  return request({
    url: '/greenguard/manager/user/analyze/child/list',
    method: 'post',
    data
  })
}

// 用户增长情况
export function get_user_increased_data(data) {
  return request({
    url: '/greenguard/manager/user/analyze/increased',
    method: 'post',
    data
  })
}

// 绑定用户增长情况
export function get_bind_user_increased_data(data) {
  return request({
    url: '/greenguard/manager/user/analyze/increased/bind_user',
    method: 'post',
    data
  })
}

// 绑定设备增长情况
export function get_bind_device_increased_data(data) {
  return request({
    url: '/greenguard/manager/user/analyze/increased/bind_device',
    method: 'post',
    data
  })
}

/*
* 应用推荐管理
*  */

// 推荐应用列表
export function get_manager_soft_recommend_list(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/list',
    method: 'post',
    data
  })
}

// 创建推荐应用
export function create_soft_remmend(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/add',
    method: 'post',
    data
  })
}

// 编辑推荐应用
export function edit_soft_remmend(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/edit',
    method: 'post',
    data
  })
}

// 禁用推荐应用
export function forbidden_soft_remmend(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/delete',
    method: 'post',
    data
  })
}

// 搜索应用(从应用市场)
export function search_soft_recommend_mark(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/mark/search',
    method: 'post',
    data
  })
}

// 获取推荐应用组合
export function get_soft_recommend_group(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/group/list',
    method: 'post',
    data
  })
}

// 创建推荐应用组合
export function create_soft_recommend_group(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/group/add',
    method: 'post',
    data
  })
}

// 禁用推荐应用组合
export function forbidden_soft_recommend_group(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/group/delete',
    method: 'post',
    data
  })
}

// 推荐应用组合详情信息
export function get_soft_recommend_group_detail(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/group/detail',
    method: 'post',
    data
  })
}

// 编辑推荐应用组合
export function edit_soft_recommend_group(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/group/edit',
    method: 'post',
    data
  })
}

// 发布或撤销应用组合
export function deploy_soft_recommend_group(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/group/publish',
    method: 'post',
    data
  })
}

// 发布或撤销发布问题
export function deploy_qa(data) {
  return request({
    url: '/greenguard/manager/qa/publish',
    method: 'post',
    data
  })
}

/*
* 应用版本管理
*  */

// 获取应用版本列表
export function get_application_version_list(data) {
  return request({
    url: '/greenguard/manager/app/version/list',
    method: 'post',
    data
  })
}

// 添加应用版本记录
export function add_application_version(data) {
  return request({
    url: '/greenguard/manager/app/version/add',
    method: 'post',
    data
  })
}

// 启动或停止应用版本
export function deploy_application_version(data) {
  return request({
    url: '/greenguard/manager/app/version/startup',
    method: 'post',
    data
  })
}

// 批量推送App版本更新
export function sync_platform_to_all(data) {
  return request({
    url: '/greenguard/manager/app/version/send/command',
    method: 'post',
    data
  })
}

// 编辑应用版本记录
export function edit_application_version(data) {
  return request({
    url: '/greenguard/manager/app/version/update',
    method: 'post',
    data
  })
}

// 获取单个应用版本记录的详情
export function get_application_version(data) {
  return request({
    url: '/greenguard/manager/app/version/get',
    method: 'post',
    data
  })
}

/*
* 订单管理
*  */

// 获取订单管理列表
export function get_order_list(data) {
  return request({
    url: '/greenguard/manager/order/list',
    method: 'post',
    data
  })
}

// 获取会员充值流水
export function get_member_plan_flow_list(data) {
  return request({
    url: '/greenguard/manager/member/plan/flow/list',
    method: 'post',
    data
  })
}

/*
* 会员管理
*  */

// 获取会员套餐列表
export function get_member_plan_list(data) {
  return request({
    url: '/greenguard/manager/member/plan/list',
    method: 'post',
    data
  })
}

// 删除会员套餐
export function delete_member_plan(data) {
  return request({
    url: '/greenguard/manager/member/plan/delete',
    method: 'post',
    data
  })
}

// 新增会员套餐
export function add_member_plan(data) {
  return request({
    url: '/greenguard/manager/member/plan/add',
    method: 'post',
    data
  })
}

// 编辑会员套餐 与 上下架
export function update_member_plan(data) {
  return request({
    url: '/greenguard/manager/member/plan/edit',
    method: 'post',
    data
  })
}

/*
* 会员活动管理
*  */

// 获取会员活动列表
export function get_member_activity_list(data) {
  return request({
    url: '/greenguard/manager/member/activity/list',
    method: 'post',
    data
  })
}

// 获取会员活动详情
export function get_member_activity_details(data) {
  return request({
    url: '/greenguard/manager/member/activity/info',
    method: 'post',
    data
  })
}

// 获取指定活动的参与用户
export function get_member_activity_user_list(data) {
  return request({
    url: '/greenguard/manager/member/activity/user/list',
    method: 'post',
    data
  })
}

// 创建会员活动
export function add_member_activity(data) {
  return request({
    url: '/greenguard/manager/member/activity/add',
    method: 'post',
    data
  })
}

// 编辑会员活动
export function edit_member_activity(data) {
  return request({
    url: '/greenguard/manager/member/activity/edit',
    method: 'post',
    data
  })
}

/*
* 广告模块
*  */

// 获取广告列表
export function get_advertising_list(data) {
  return request({
    url: '/greenguard/manager/advertising/list',
    method: 'post',
    data
  })
}

// 创建广告
export function add_advertising(data) {
  return request({
    url: '/greenguard/manager/advertising/add',
    method: 'post',
    data
  })
}

// 编辑广告
export function edit_advertising(data) {
  return request({
    url: '/greenguard/manager/advertising/edit',
    method: 'post',
    data
  })
}

// 删除广告
export function delete_advertising(data) {
  return request({
    url: '/greenguard/manager/advertising/delete',
    method: 'post',
    data
  })
}

/*
* 应用版本管理
* */

// 获取版本分布情况
export function get_version_distribution(data) {
  return request({
    url: '/greenguard/manager/app/version/distribution',
    method: 'post',
    data
  })
}
