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
* 首页
* */

// 获取整体数据
export function get_homepage_overall_data() {
  return request({
    url: '/greenguard/manager/index/summary',
    method: 'post'
  })
}

// 获取增长数据
export function get_homepage_growth_data(data) {
  return request({
    url: '/greenguard/manager/index/list',
    method: 'post',
    data
  })
}

/*
* 用户信息管理
*  */

// 获取用户来源列表
export function get_user_reg_from_list(data) {
  return request({
    url: '/greenguard/common/user/reg_from/list',
    method: 'post',
    data
  })
}

// 获取家长用户列表
export function get_parent_list(data) {
  return request({
    url: '/greenguard/manager/user/patriarch/list',
    method: 'post',
    data
  })
}

// 获取家长用户（导出）列表
export function get_patriarch_list_export(data) {
  return request({
    url: '/greenguard/manager/user/patriarch/list/export',
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

// 用户信息管理 - 电信退订接口
export function monthlyplan_unsubscribe_ctccsp(data) {
  return request({
    url: '/greenguard/manager/member/monthlyplan/unsubscribe/ctccsp',
    method: 'post',
    data
  })
}

// 用户信息管理 - 退订记录的接口
export function get_monthlyplan_unsubscribe_list(data) {
  return request({
    url: '/greenguard/manager/member/monthlyplan/unsubscribe/list',
    method: 'post',
    data
  })
}

// 设备管理 - 为孩子解绑设备
export function unbind_user_device(data) {
  return request({
    url: '/greenguard/manager/device/unbind',
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

// 获取孩子用户列表
export function get_user_child_list(data) {
  return request({
    url: '/greenguard/manager/user/child/list',
    method: 'post',
    data
  })
}

// 导出孩子的用户数据列表
export function get_child_list_export(data) {
  return request({
    url: '/greenguard/manager/user/child/list/export',
    method: 'post',
    data
  })
}

// 获取孩子端 - 设备使用记录
export function get_child_use_recorder(data) {
  return request({
    url: '/greenguard/manager/device/getAppUsage',
    method: 'post',
    data
  })
}

/*
* 常见问题管理
*  */

// 获取常见问题类别
export function get_patriarch_questions_qa_list(data) {
  return request({
    url: '/greenguard/manager/qa/type/list',
    method: 'post',
    data
  })
}

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

// 孩子端-整体数据指标
export function get_user_analysis_child_summary(data) {
  return request({
    url: '/greenguard/manager/user/analyze/child/summary',
    method: 'post',
    data
  })
}

// 孩子端-用户增长情况
export function get_user_analysis_child_increased(data) {
  return request({
    url: '/greenguard/manager/user/analyze/child/increased',
    method: 'post',
    data
  })
}

// 孩子端-绑定用户增长情况
export function get_user_analysis_child_increased_bind_user(data) {
  return request({
    url: '/greenguard/manager/user/analyze/child/increased/bind_user',
    method: 'post',
    data
  })
}

// 孩子端-绑定设备增长情况
export function get_user_analysis_child_increased_bind_device(data) {
  return request({
    url: '/greenguard/manager/user/analyze/child/increased/bind_device',
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

// 导出订单列表
export function export_order_list(data) {
  return request({
    url: '/greenguard/manager/order/list/export',
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

/*
* 推荐应用专题
* */

// 获取推荐应用专题
export function get_recommend_subject_list(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/subject/list',
    method: 'post',
    data
  })
}

// 创建推荐应用专题
export function create_recommend_subject(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/subject/add',
    method: 'post',
    data
  })
}

// 编辑推荐应用专题
export function edit_recommend_subject(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/subject/edit',
    method: 'post',
    data
  })
}

// 禁用推荐应用专题
export function forbidden_recommend_subject(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/subject/delete',
    method: 'post',
    data
  })
}

// 推荐应用专题详情
export function get_recommend_subject_detail(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/subject/detail',
    method: 'post',
    data
  })
}

// 应用专题上下架
export function publish_recommend_subject_detail(data) {
  return request({
    url: '/greenguard/manager/soft/recommend/subject/publish',
    method: 'post',
    data
  })
}

/*
* 系统参数
*  */

// 获取系统参数列表
export function get_sys_configuration_list(data) {
  return request({
    url: '/greenguard/manager/sys/param/list',
    method: 'post',
    data
  })
}

// 获取系统参数详细信息
export function get_sys_configuration_details(data) {
  return request({
    url: '/greenguard/manager/sys/param/get',
    method: 'post',
    data
  })
}

// 获取系统类型列表
export function get_sys_param_type_list(data) {
  return request({
    url: '/greenguard/manager/sys/param/get/type/list',
    method: 'post',
    data
  })
}

// 添加系统参数
export function create_sys_configuration(data) {
  return request({
    url: '/greenguard/manager/sys/param/add',
    method: 'post',
    data
  })
}

// 编辑系统参数
export function edit_sys_configuration(data) {
  return request({
    url: '/greenguard/manager/sys/param/edit',
    method: 'post',
    data
  })
}

// 删除系统参数
export function delete_sys_configuration(data) {
  return request({
    url: '/greenguard/manager/sys/param/delete',
    method: 'post',
    data
  })
}

/*
  高危应用
 */

// 高危应用列表
export function get_high_risk_soft_list(data) {
  return request({
    url: '/greenguard/manager/risk/soft/list',
    method: 'post',
    data
  })
}

// 获取高危软件详情
export function get_high_risk_soft_detail(data) {
  return request({
    url: '/greenguard/manager/risk/soft/get',
    method: 'post',
    data
  })
}

// 添加高危软件
export function add_high_risk_soft(data) {
  return request({
    url: '/greenguard/manager/risk/soft/add',
    method: 'post',
    data
  })
}

// 编辑高危软件
export function edit_high_risk_soft(data) {
  return request({
    url: '/greenguard/manager/risk/soft/edit',
    method: 'post',
    data
  })
}

// 批量删除高危软件
export function delete_multi_high_risk_soft(data) {
  return request({
    url: '/greenguard/manager/risk/soft/delete',
    method: 'post',
    data
  })
}

/* 用户邀请注册 */

// 邀请好友活动数据
export function get_invite_statisis_data(data) {
  return request({
    url: '/greenguard/manager/user/invite/register/statistics/list',
    method: 'post',
    data
  })
}

// 邀请注册活动详情
export function get_invite_register_activity_info() {
  return request({
    url: '/greenguard/manager/user/invite/register/activity/info',
    method: 'post'
  })
}

// 编辑邀请注册活动
export function edit_invite_register_activity(data) {
  return request({
    url: '/greenguard/manager/user/invite/register/activity/edit',
    method: 'post',
    data
  })
}

/*
* 商务合作注册页
* */

// 创建或编辑商务注册页
export function edit_business_cooperation(data) {
  return request({
    url: '/greenguard/manager/channel/saveOrUpdate',
    method: 'post',
    data
  })
}

// 获取商务注册页详情
export function get_business_cooperation_details(data) {
  return request({
    url: '/greenguard/manager/channel/info',
    method: 'post',
    data
  })
}

// 获取商务注册页列表
export function get_business_cooperation_list(data) {
  return request({
    url: '/greenguard/manager/channel/list',
    method: 'post',
    data
  })
}
// 获取语音短信
export function get_manager_voice_list(data) {
  return request({
    url: '/greenguard/manager/voice/query/record',
    method: 'post',
    data
  })
}
// 获取文本短信
export function get_manager_sms_list(data) {
  return request({
    url: '/greenguard/manager/sms/query/record',
    method: 'post',
    data
  })
}

// 解绑孩子端描述文件
export function do_unbind_desc_file(data) {
  return request({
    url: '/greenguard/manager/user/profile/unbind',
    method: 'post',
    data
  })
}
