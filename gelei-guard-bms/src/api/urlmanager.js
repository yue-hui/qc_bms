/* API路径管理 */

export const URL_MANAGER = {
  // 格雷守护服务
  'GreenGuard.Server': '/greenguard',
  // 格雷守护服务 - 公共模块
  'GreenGuard.Common': '/greenguard/common',
  'GreenGuard.Common.Order.Type.List': '/greenguard/common/order/type/list', // 获取订单类型列表
  'GreenGuard.Common.Order.Status.List': '/greenguard/common/order/status/list', // 获取订单状态列表
  'GreenGuard.Common.Order.PayType.List': '/greenguard/common/order/paytype/list', // 获取订单状态列表
  'GreenGuard.Common.Advertising.Type.List': '/greenguard/common/advertising/type/list', // 获取广告类型列表
  'GreenGuard.Common.Advertising.Point.List': '/greenguard/common/advertising/point/list', // 获取广告位置列表
  // 格雷守护 - 管理后台
  // 格雷守护 - 管理后台 - 用户信息管理
  'GreenGuard.Manager.Patriarch.List': '/greenguard/manager/user/patriarch/list', // 获取家长用户列表
  'GreenGuard.Manager.Patriarch.Detail': '/greenguard/manager/user/patriarch/detail', // 获取家长详情信息
  // 获取孩子设备操作（绑定或解绑）记录
  'GreenGuard.Manager.Patriarch.ChildrenDevice.Record.List': '/greenguard/manager/user/patriarch/child_device/record/list',
  // 格雷守护 - 管理后台 - 常见问题管理
  'GreenGuard.Manager.Question.List': '/greenguard/manager/qa/list', // 获取常见问题列表
  'GreenGuard.Manager.Question.Add': '/greenguard/manager/qa/add', // 创建常见问题
  'GreenGuard.Manager.Question.Edit': '/greenguard/manager/qa/edit', // 编辑常见问题
  'GreenGuard.Manager.Question.Detail': '/greenguard/manager/qa/detail', // 常见问题详情
  'GreenGuard.Manager.Question.Delete': '/greenguard/manager/qa/delete', // 删除常见问题
  'GreenGuard.Manager.Question.Publish': '/greenguard/manager/qa/publish', // 发布或撤销发布问题
  // 格雷守护 - 管理后台 - 用户数据分析
  'GreenGuard.Manager.User.Analyze.Summary': '/greenguard/manager/user/analyze/summary', // 用户分析整体情况
  'GreenGuard.Manager.User.Analyze.List': '/greenguard/manager/user/analyze/list', // 家长端详细数据列表
  'GreenGuard.Manager.User.Analyze.Child.List': '/greenguard/manager/user/analyze/child/list', // 孩子端详细数据列表
  'GreenGuard.Manager.User.Analyze.Increased': '/greenguard/manager/user/analyze/increased', // 用户增长情况
  'GreenGuard.Manager.User.Analyze.Increased.BindUser': '/greenguard/manager/user/analyze/increased/bind_user', // 绑定用户增长情况
  'GreenGuard.Manager.User.Analyze.Increased.BindDevice': '/greenguard/manager/user/analyze/increased/bind_device', // 绑定设备增长情况
  // 格雷守护 - 管理后台 - 应用推荐管理
  'GreenGuard.Manager.Soft.Recommend.List': '/greenguard/manager/soft/recommend/list', // 推荐应用列表
  'GreenGuard.Manager.Soft.Recommend.Add': '/greenguard/manager/soft/recommend/add', // 创建推荐应用
  'GreenGuard.Manager.Soft.Recommend.Edit': '/greenguard/manager/soft/recommend/edit', // 编辑推荐应用
  'GreenGuard.Manager.Soft.Recommend.Delete': '/greenguard/manager/soft/recommend/delete', // 禁用推荐应用
  'GreenGuard.Manager.Soft.Recommend.Mark.Search': '/greenguard/manager/soft/recommend/mark/search', // 搜索应用(从应用市场)
  'GreenGuard.Manager.Soft.Recommend.Group.List': '/greenguard/manager/soft/recommend/group/list', // 获取推荐应用组合
  'GreenGuard.Manager.Soft.Recommend.Group.Add': '/greenguard/manager/soft/recommend/group/add', // 创建推荐应用组合
  'GreenGuard.Manager.Soft.Recommend.Group.Delete': '/greenguard/manager/soft/recommend/group/delete', // 禁用推荐应用组合
  'GreenGuard.Manager.Soft.Recommend.Group.Detail': '/greenguard/manager/soft/recommend/group/detail', // 推荐应用组合详情信息
  'GreenGuard.Manager.Soft.Recommend.Group.Edit': '/greenguard/manager/soft/recommend/group/edit', // 编辑推荐应用组合
  'GreenGuard.Manager.Soft.Recommend.Group.Publish': '/greenguard/manager/soft/recommend/group/publish', // 发布或撤销应用组合
  // 格雷守护 - 管理后台 - 订单模块
  'GreenGuard.Manager.Order.List': '/greenguard/manager/order/list', // 获取订单管理列表
  // 格雷守护 - 管理后台 - 应用版本管理
  'GreenGuard.Manager.App.Version.List': '/greenguard/manager/app/version/list', // 获取应用版本列表
  'GreenGuard.Manager.App.Version.Add': '/greenguard/manager/app/version/add', // 添加应用版本记录
  'GreenGuard.Manager.App.Version.Startup': '/greenguard/manager/app/version/startup', // 启动或停止应用版本
  'GreenGuard.Manager.App.Version.Send.Command': '/greenguard/manager/app/version/send/command', // 批量推送App版本更新
  'GreenGuard.Manager.App.Version.Update': '/greenguard/manager/app/version/update', // 编辑应用版本记录
  'GreenGuard.Manager.App.Version.Get': '/greenguard/manager/app/version/get', // 获取单个应用版本记录的详情
  // 格雷守护 - 管理后台 - 会员管理
  'GreenGuard.Manager.Member.Plan.List': '/greenguard/manager/member/plan/list', // 获取会员套餐列表
  'GreenGuard.Manager.Member.Plan.Flow.List': '/greenguard/manager/member/plan/flow/list', // 获取会员充值流水
  'GreenGuard.Manager.Member.Plan.Delete': '/greenguard/manager/member/plan/delete', // 删除会员套餐
  'GreenGuard.Manager.Member.Plan.Add': '/greenguard/manager/member/plan/add', // 新增会员套餐
  'GreenGuard.Manager.Member.Plan.Edit': '/greenguard/manager/member/plan/edit', // 编辑会员套餐 与 会员套餐上下架
  'GreenGuard.Manager.Member.Activity.List': '/greenguard/manager/member/activity/list', // 获取会员活动列表
  'GreenGuard.Manager.Member.Activity.Info': '/greenguard/manager/member/activity/info', // 获取会员活动详情
  'GreenGuard.Manager.Member.Activity.User.Info': '/greenguard/manager/member/activity/user/list', // 获取指定活动的参与用户
  'GreenGuard.Manager.Member.Activity.Add': '/greenguard/manager/member/activity/add', // 创建会员活动
  'GreenGuard.Manager.Member.Activity.Edit': '/greenguard/manager/member/activity/edit', // 编辑会员活动
  // 格雷守护 - 管理后台 - 广告模块
  'GreenGuard.Manager.Advertising.List': '/greenguard/manager/advertising/list', // 获取广告列表
  'GreenGuard.Manager.Advertising.Add': '/greenguard/manager/advertising/add', // 创建广告
  'GreenGuard.Manager.Advertising.Edit': '/greenguard/manager/advertising/edit', // 编辑广告
  'GreenGuard.Manager.Advertising.Delete': '/greenguard/manager/advertising/delete', // 删除广告
  // 文件服务
  'File.Server': '/file',
  'File.Data.SecondPass': '/file/data/secondpass', // 文件秒传
  'File.Data.Upload': '/file/data/upload', // 文件上传（表单）
  'File.Data.Delete': '/file/data/delete' // 文件删除
}
