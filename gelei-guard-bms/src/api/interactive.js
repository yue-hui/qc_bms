import request from '../utils/request'

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
export function get_homepage_overall_data(data) {
  return request({
    url: '/greenguard/manager/index/summary',
    method: 'post',
    data
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
    url: '/greenguard/common/user/regFrom/list',
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

// 获取所有会员套餐列表
export function get_all_member_plans(data) {
  return request({
    url: '/greenguard/manager/member/plan/list/all',
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

// 获取当前登录用户相同角色用户列表
export function get_manager_channel_associated_user_list(data) {
  return request({
    url: '/greenguard/manager/channel/associated/user',
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

// 根据bundle id获取应用名称
export function get_soft_info_by_bundle_id(data) {
  return request({
    url: '/greenguard/manager/index/querySoftByBundleId',
    method: 'post',
    data
  })
}

// 小程序管理列表
export function get_miniprogram_list(data) {
  return request({
    url: '/greenguard/manager/miniprogram/list',
    method: 'post',
    data
  })
}

// 新增小程序+功能
export function add_miniprogram_app(data) {
  return request({
    url: '/greenguard/manager/miniprogram/add',
    method: 'post',
    data
  })
}

// 编辑小程序+功能
export function edit_miniprogram_app(data) {
  return request({
    url: '/greenguard/manager/miniprogram/edit',
    method: 'post',
    data
  })
}

// 删除小程序+功能
export function delete_miniprogram_app(data) {
  return request({
    url: '/greenguard/manager/miniprogram/del',
    method: 'post',
    data
  })
}

/*
* 权限管理
* */

// 初始化权限
export function initialize_permission_code(data) {
  return request({
    url: '/greenguard/manager/funCode/initialize',
    method: 'post',
    data
  })
}

// 获取权限列表
export function get_permission_codes(data) {
  return request({
    url: '/greenguard/manager/funCode/list',
    method: 'post',
    data
  })
}

/*
* 权限管理
* */

// 获取系统用户列表
export function get_system_users(data) {
  return request({
    url: '/greenguard/manager/user/list',
    method: 'post',
    data
  })
}

// 创建或者编辑用户信息
export function create_or_update_user_information(data) {
  return request({
    url: '/greenguard/manager/user/saveOrUpdate',
    method: 'post',
    data
  })
}

// 启用或禁用用户账号
export function enable_or_disable_system_account(data) {
  return request({
    url: '/greenguard/manager/user/updateState',
    method: 'post',
    data
  })
}

// 重置密码
export function reset_system_account(data) {
  return request({
    url: '/greenguard/manager/user/password/reset',
    method: 'post',
    data
  })
}

/*
* 角色管理
* */

// 获取角色列表
export function get_sys_roles(data) {
  return request({
    url: '/greenguard/manager/sysRole/list',
    method: 'post',
    data
  })
}

// 获取所有角色列表
export function get_all_sys_roles(data) {
  return request({
    url: '/greenguard/manager/sysRole/list/all',
    method: 'post',
    data
  })
}

// 查询角色信息
export function get_sys_role_information(data) {
  return request({
    url: '/greenguard/manager/sysRole/info',
    method: 'post',
    data
  })
}

// 查询角色信息
export function get_sys_role_configure(data) {
  return request({
    url: '/ns-permission/roles/greenguard/manager/sysRole/info',
    method: 'post',
    data
  })
}

// 创建或者编辑角色
export function create_or_update_sys_role(data) {
  return request({
    url: '/ns-permission/roles/greenguard/manager/sysRole/saveOrUpdate',
    method: 'post',
    data
  })
}

// 删除系统角色
export function delete_sys_role(data) {
  return request({
    url: '/greenguard/manager/sysRole/delete',
    method: 'post',
    data
  })
}

// 发送设备运行指令
export function device_send_ins(data) {
  return request({
    url: '/greenguard/manager/device/addMobileLog',
    method: 'post',
    data
  })
}

// 查询设备日志列表
export function get_device_upload_logs_list(data) {
  return request({
    url: '/greenguard/manager/device/findMobileLog',
    method: 'post',
    data
  })
}

// 查询用户日志
export function get_device_ali_log(data) {
  return request({
    url: '/greenguard/manager/device/findAliLog',
    method: 'post',
    data
  })
}

// 查询用户操作记录
export function get_device_rule_loglist(data) {
  return request({
    url: '/greenguard/manager/rulelog/list',
    method: 'post',
    data
  })
}

// 7天签到接口
export function get_seven_clock(data) {
  return request({
    url: '/greenguard/manager/sign/list',
    method: 'post',
    data
  })
}

// 获取解绑原因占比
export function query_unbind_why_report_list(data) {
  return request({
    url: '/greenguard/manager/opinFeedback/reportList',
    method: 'post',
    data
  })
}

// 获取全部反馈类型
export function query_unbind_why_list(data) {
  return request({
    url: '/greenguard/manager/opinFeedback/type/list',
    method: 'post',
    data
  })
}
// 查询用户解绑详情列表
export function query_unbind_user_list(data) {
  return request({
    url: '/greenguard/manager/opinFeedback/list',
    method: 'post',
    data
  })
}

// 获取导出用户解绑详情列表
export function export_unbind_user_list(data) {
  return request({
    url: '/greenguard/manager/opinFeedback/listExport',
    method: 'post',
    data
  })
}

// /////////////////////////////////
/**
 * @description 获取话题首页分页数据
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1379
 * */
export function getTopicList(data) {
  // eslint-disable-next-line no-unreachable
  return request({
    url: '/greenguard/manager/supertopic/list',
    method: 'post',
    data
  })
}
/**
 * @description 话题新增
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1380
 * */
export function addTopic(data) {
  return request({
    url: '/greenguard/manager/supertopic/add',
    method: 'post',
    data
  })
}

/**
 * @description 话题上架/下架/删除
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1399
 * */
export function topicAction(data) {
  return request({
    url: '/greenguard/manager/supertopic/listing',
    method: 'post',
    data
  })
}

/**
 * @description push 推送列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1389
 */
export function pushNotificationList(data) {
  return request({
    url: '/greenguard/manager/push/notice/list',
    method: 'post',
    data
  })
}

/**
 * @description 新增 push 推送
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1391
 * */
export function addPushNotification(data) {
  return request({
    url: '/greenguard/manager/push/notice/add',
    method: 'post',
    data
  })
}

/**
 * @description 运营位统计
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1383
 * */
export function topicBannerListStatistics(data) {
  return request({
    url: '/greenguard/manager/supertopic/bannerlist',
    method: 'post',
    data
  })
}

/**
 * @description 参与详情
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1384
 * */
export function topicJoinDetail(data) {
  return request({
    url: '/greenguard/manager/supertopic/votedetail',
    method: 'post',
    data
  })
}

/**
 * @description 话题详情
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1384
 * */
export function topicDetail(data) {
  return request({
    url: '/greenguard/manager/supertopic/detail',
    method: 'post',
    data
  })
}

/**
 * @description 话题更新
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1381
 * */
export function topicUpdate(data) {
  return request({
    url: '/greenguard/manager/supertopic/edit',
    method: 'post',
    data
  })
}

/**
 * @description 删除 push 通知
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1403
 * */
export function removePushNotice(data) {
  return request({
    url: '/greenguard/manager/push/notice/delete',
    method: 'post',
    data
  })
}

/**
 * @description 获取 push 详情
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1390
 * */
export function getPushNoticeInfo(data) {
  return request({
    url: '/greenguard/manager/push/notice/count/info',
    method: 'post',
    data
  })
}

/**
 * @description 获取所有渠道 tag
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1469
 * */
export function getStoreAllTags(data) {
  return request({
    url: '/greenguard/manager/store/tag/group',
    method: 'post',
    data
  })
}
/**
 * @description 前五渠道总体数据
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1447
 * */
export function getStoreTagTypeTop5(data) {
  return request({
    url: '/greenguard/manager/store/tag/type',
    method: 'post',
    data
  })
}
/**
 * @description 获取渠道详情数据
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1448
 * */
export function getStoreDetail(data) {
  return request({
    url: '/greenguard/manager/store/tag/details',
    method: 'post',
    data
  })
}
/**
 * @description 获取渠道详情数据 - 明细列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1448
 * */
export function getStoreDetailList(data) {
  return request({
    url: '/greenguard/manager/store/tag/details/list',
    method: 'post',
    data
  })
}
/**
 * @description 获取渠道列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1450
 * */
export function getStoreListDetail(data) {
  return request({
    url: '/greenguard/manager/store/tag/list',
    method: 'post',
    data
  })
}
/**
 * @description 获取邀请好友首页列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1468
 * */
export function getInvitationV2List(data) {
  return request({
    url: '/greenguard/manager/invitation/list',
    method: 'post',
    data
  })
}
/**
 * @description 获取购买成功之后弹窗文案配置
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1475
 * */
export function getBuyConfig(data) {
  return request({
    url: '/greenguard/manager/invitation/ad',
    method: 'post',
    data
  })
}
/**
 * @description 保存购买成功之后弹窗文案配置
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1474
 * */
export function saveBuyConfig(data) {
  return request({
    url: '/greenguard/manager/invitation/ad/save',
    method: 'post',
    data
  })
}

/**
 * @description 保存活动
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1472
 * */
export function saveInvitationV2(data) {
  return request({
    url: '/greenguard/manager/invitation/save',
    method: 'post',
    data
  })
}
/**
 * @description 查询活动详情
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1473
 * */
export function queryInvitationV2(data) {
  return request({
    url: '/greenguard/manager/invitation/query',
    method: 'post',
    data
  })
}

/**
 * @description 邀请人列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1476
 * */
export function queryInvitationV2Inviters(data) {
  return request({
    url: '/greenguard/manager/invitation/inviters',
    method: 'post',
    data
  })
}
/**
 * @description 被邀请人列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1477
 * */
export function queryInvitationV2Invitees(data) {
  return request({
    url: '/greenguard/manager/invitation/invitees',
    method: 'post',
    data
  })
}
/**
 * @description 活动上架
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1470
 * */
export function invitationV2Listing(data) {
  return request({
    url: '/greenguard/manager/invitation/listing',
    method: 'post',
    data
  })
}
/**
 * @description 获取兑换码包列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1496
 * */
export function getExchangeList(data) {
  return request({
    url: '/greenguard/manager/cdk_pack/list',
    method: 'post',
    data
  })
}
/**
 * @description 使兑换码包失效
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1497
 * */
export function disableExchangePackage(data) {
  return request({
    url: '/greenguard/manager/cdk_pack/disable',
    method: 'post',
    data
  })
}
/**
 * @description 保存兑换包
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1497
 * */
export function saveExchangePackage(data) {
  return request({
    url: '/greenguard/manager/cdk_pack/add',
    method: 'post',
    data
  })
}
/**
 * @description 更新兑换包
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1495
 * */
export function updateExchangePackage(data) {
  return request({
    url: '/greenguard/manager/cdk_pack/edit',
    method: 'post',
    data
  })
}
/**
 * @description 兑换码列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1499
 * */
export function packageCodeList(data) {
  return request({
    url: '/greenguard/manager/cdk/list',
    method: 'post',
    data
  })
}
/**
 * @description 兑换码列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1499
 * */
export function updatePackageCodeRemark(data) {
  return request({
    url: '/greenguard/manager/cdk/remark',
    method: 'post',
    data
  })
}
/**
 * @description 兑换码包添加库存
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1498
 * */
export function packageAddCode(data) {
  return request({
    url: '/greenguard/manager/cdk/add',
    method: 'post',
    data
  })
}
/**
 * @description 兑换码包添加库存
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1505
 * */
export function getPackageDetail(data) {
  return request({
    url: '/greenguard/manager/cdk_pack/details',
    method: 'post',
    data
  })
}
/**
 * @description 设备权限管理-列表
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1518
 * */
export function deviceRuleConfigList(data) {
  return request({
    url: '/greenguard/manager/guard/config/list',
    method: 'post',
    data
  })
}
/**
 * @description 设备权限管理-添加
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1518
 * */
export function deviceRuleConfigAdd(data) {
  return request({
    url: '/greenguard/manager/guard/config/add',
    method: 'post',
    data
  })
}
/**
 * @description 设备权限管理-修改
 * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1519
 * */
export function deviceRuleConfigUpdate(data) {
  return request({
    url: '/greenguard/manager/guard/config/edit',
    method: 'post',
    data
  })
}
/**
 * @description 清除 APP 锁
 * @doc https://showdoc.qcg.cc:9999/web/#/1?page_id=1554
 * */
export function clearAppLock(data) {
  return request({
    url: '/greenguard/manager/user/applock/clear',
    method: 'post',
    data
  })
}

/**
 * @description 查看设备规则
 * @doc https://www.tapd.cn/43727804/markdown_wikis/show/#1143727804001000654
 * */
 export function deviceRules(data) {
  return request({
    url: '/greenguard/manager/device/ruleInfo',
    method: 'post',
    data
  })
}

/**
 * @description SN订单列表
 * @doc https://www.tapd.cn/43727804/markdown_wikis/show/#1143727804001000841
 * */
 export function getSnorderList(data) {
  return request({
    url: '/greenguard/common/order/sn/list',
    method: 'post',
    data
  })
}

/**
 * @description 新增SN订单
 * @doc https://www.tapd.cn/43727804/markdown_wikis/show/#1143727804001000841
 * */
 export function addSnorderApi(data) {
  return request({
    url: '/greenguard/common/order/sn/add',
    method: 'post',
    data
  })
}

/**
 * @description 编辑SN订单
 * @doc https://www.tapd.cn/43727804/markdown_wikis/show/#1143727804001000841
 * */
 export function editSnorderApi(data) {
  return request({
    url: '/greenguard/common/order/sn/edit',
    method: 'post',
    data
  })
}