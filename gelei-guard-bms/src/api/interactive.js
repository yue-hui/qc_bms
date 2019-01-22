import request from '@/utils/request'

/* 用户信息管理 */

// 获取家长用户列表
export function get_parent_list(data) {
  return request({
    url: '/manager/user/patriarch/list',
    method: 'post',
    data
  })
}

// 用户信息管理 - 获取家长详情信息
export function get_parent_details(data) {
  return request({
    url: '/manager/user/patriarch/detail',
    method: 'post',
    data
  })
}

/* 常见问题管理 */

// 获取常见问题列表
export function get_questions_list(data) {
  return request({
    url: '/manager/qa/list',
    method: 'post',
    data
  })
}

// 创建常见问题
export function create_questions(data) {
  return request({
    url: '/manager/qa/add',
    method: 'post',
    data
  })
}

// 编辑常见问题
export function update_questions(data) {
  return request({
    url: '/manager/qa/edit',
    method: 'post',
    data
  })
}

// 常见问题详情
export function get_questions_details(data) {
  return request({
    url: '/manager/qa/detail',
    method: 'post',
    data
  })
}

// 删除常见问题
export function delete_questions(data) {
  return request({
    url: '/manager/qa/delete',
    method: 'post',
    data
  })
}

/* 用户数据分析 */

// 用户分析整体情况
export function get_user_analysis_summary(data) {
  return request({
    url: '/manager/user/analyze/summary',
    method: 'post',
    data
  })
}

// 用户分析详细列表
export function get_user_analysis_details(data) {
  return request({
    url: '/manager/user/analyze/list',
    method: 'post',
    data
  })
}

// 用户增长情况
export function get_user_increased_data(data) {
  return request({
    url: '/manager/user/analyze/increased',
    method: 'post',
    data
  })
}

// 绑定用户增长情况
export function get_bind_user_increased_data(data) {
  return request({
    url: '/manager/user/analyze/increased/bind_user',
    method: 'post',
    data
  })
}

// 绑定设备增长情况
export function get_bind_device_increased_data(data) {
  return request({
    url: '/manager/user/analyze/increased/bind_device',
    method: 'post',
    data
  })
}

/* 应用推荐管理 */

// 推荐应用列表
export function get_manager_soft_recommend_list(data) {
  return request({
    url: '/manager/soft/recommend/list',
    method: 'post',
    data
  })
}

// 创建推荐应用
export function create_soft_remmend(data) {
  return request({
    url: '/manager/soft/recommend/add',
    method: 'post',
    data
  })
}

// 编辑推荐应用
export function edit_soft_remmend(data) {
  return request({
    url: '/manager/soft/recommend/edit',
    method: 'post',
    data
  })
}

// 禁用推荐应用
export function forbidden_soft_remmend(data) {
  return request({
    url: '/manager/soft/recommend/delete',
    method: 'post',
    data
  })
}

// 搜索应用(从应用市场)
export function search_soft_recommend_mark(data) {
  return request({
    url: '/manager/soft/recommend/mark/search',
    method: 'post',
    data
  })
}

// 获取推荐应用组合
export function get_soft_recommend_group(data) {
  return request({
    url: '/manager/soft/recommend/group/list',
    method: 'post',
    data
  })
}

// 创建推荐应用组合
export function create_soft_recommend_group(data) {
  return request({
    url: '/manager/soft/recommend/group/add',
    method: 'post',
    data
  })
}

// 禁用推荐应用组合
export function forbidden_soft_recommend_group(data) {
  return request({
    url: '/manager/soft/recommend/group/delete',
    method: 'post',
    data
  })
}

// 推荐应用组合详情信息
export function get_soft_recommend_group_detail(data) {
  return request({
    url: '/manager/soft/recommend/group/detail',
    method: 'post',
    data
  })
}

// 编辑推荐应用组合
export function edit_soft_recommend_group(data) {
  return request({
    url: '/manager/soft/recommend/group/edit',
    method: 'post',
    data
  })
}

// 发布或撤销应用组合
export function deploy_soft_recommend_group(data) {
  return request({
    url: '/manager/soft/recommend/group/publish',
    method: 'post',
    data
  })
}

// 发布或撤销应用组合
export function deploy_qa(data) {
  return request({
    url: '/manager/qa/publish',
    method: 'post',
    data
  })
}

