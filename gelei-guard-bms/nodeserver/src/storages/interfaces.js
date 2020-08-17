export const PAGE_PERMISSION = [
  // {
  //   name: '示例',
  //   path: 'example',
  //   code: ''
  // },
  // 公共服务
  {
    name: '获取图形验证码',
    path: 'common/get/verify/code',
    code: '40001'
  },
  {
    name: '获取用户来源列表',
    path: 'common/user/reg_from/list',
    code: '40005'
  },
  {
    name: '获取订单类型列表',
    path: 'common/order/type/list',
    code: '40006'
  },
  {
    name: '获取订单状态列表',
    path: 'common/order/status/list',
    code: '40007'
  },
  {
    name: '获取支付类型列表',
    path: 'common/order/paytype/list',
    code: '40008'
  },
  {
    name: '获取设备的应用使用记录', // 家长端
    path: 'manager/device/getAppUsage',
    code: '10030'
  },
  {
    name: '秒传接口', // 家长端
    path: 'file/data/secondpass',
    code: '40019'
  },
  {
    name: '文件上传接口', // 家长端
    path: 'file/data/upload',
    code: '40020'
  },
  {
    name: '获取广告类型列表', // 家长端
    path: 'common/advertising/type/list',
    code: '40027'
  },
  {
    name: '获取广告位置列表', // 家长端
    path: 'common/advertising/point/list',
    code: '40028'
  },
  {
    name: '查询用户日志',
    path: 'manager/device/findAliLog',
    code: '10246'
  },
  {
    name: '发送设备运行指令',
    path: 'manager/device/addMobileLog',
    code: '10248'
  },
  {
    name: '查询设备日志列表',
    path: 'manager/device/findMobileLog',
    code: '10247'
  },
  // 系统用户
  {
    name: '用户登录',
    path: 'manager/user/login',
    code: '40002'
  },
  {
    name: '用户登出',
    path: 'manager/user/logout',
    code: '40003'
  },
  {
    name: '获取用户详情',
    path: 'manager/user/detail',
    code: '40004'
  },
  {
    name: '获取系统用户列表',
    path: 'manager/user/list',
    code: '10095'
  },
  {
    name: '保存或者编辑用户信息 - 编辑账号',
    path: 'manager/user/saveOrUpdate',
    code: '10064'
  },
  {
    name: '保存或者编辑用户信息 - 新增账号',
    path: 'manager/user/saveOrUpdate',
    code: '10069'
  },
  {
    name: '删除账号',
    path: 'manager/user/delete',
    code: '10040'
  },
  {
    name: '修改系统用户密码',
    path: 'manager/user/password/edit',
    code: '99999'
  },
  {
    name: '修改用户状态',
    path: 'manager/user/updateState',
    code: '10017'
  },
  {
    name: '修改系统用户头像',
    path: 'manager/user/imgUrl/update',
    code: '99999'
  },
  {
    name: '重置密码',
    path: 'manager/user/password/reset',
    code: '10024'
  },
  // 首页
  {
    name: '获取整体数据',
    path: 'manager/index/summary',
    code: '10051'
  },
  {
    name: '获取增长数据',
    path: 'manager/index/list',
    code: '10034'
  },
  // 用户信息管理
  {
    name: '家长用户列表',
    path: 'manager/user/patriarch/list',
    code: '10085'
  },
  {
    name: '家长用户（导出）列表',
    path: 'manager/user/patriarch/list/export',
    code: '10088'
  },
  {
    name: '获取家长用户详情信息',
    path: 'manager/user/patriarch/detail',
    code: '10053'
  },
  {
    name: '孩子设备操作（绑定或解绑）记录',
    path: 'manager/user/patriarch/child_device/record/list',
    code: '10102'
  },
  {
    name: '孩子用户列表',
    path: 'manager/user/child/list',
    code: '10084'
  },
  {
    name: '孩子用户（导出）列表',
    path: 'manager/user/child/list/export',
    code: '10038'
  },
  {
    name: '会员退订记录',
    path: 'manager/member/monthlyplan/unsubscribe/list',
    code: '10070'
  },
  {
    name: '解绑证书',
    path: 'manager/user/profile/unbind',
    code: '10110'
  },
  {
    name: '获取孩子信息',
    path: 'manager/user/child/detail',
    code: '10026'
  },
  // 用户数据分析
  {
    name: '用户分析整体情况',
    path: 'manager/user/analyze/summary',
    code: '10089'
  },
  {
    name: '用户增长情况',
    path: 'manager/user/analyze/increased',
    code: '10118'
  },
  {
    name: '绑定用户增长情况',
    path: 'manager/user/analyze/increased/bind_user',
    code: '10124'
  },
  {
    name: '绑定设备增长情况',
    path: 'manager/user/analyze/increased/bind_device',
    code: '10117'
  },
  {
    name: '家长端详细数据列表',
    path: 'manager/user/analyze/list',
    code: '10106'
  },
  {
    name: '孩子端-整体数据指标',
    path: 'manager/user/analyze/child/summary',
    code: '10082'
  },
  {
    name: '孩子端-用户增长情况',
    path: 'manager/user/analyze/child/increased',
    code: '10105'
  },
  {
    name: '孩子端-绑定用户增长情况',
    path: 'manager/user/analyze/child/increased/bind_user',
    code: '10116'
  },
  {
    name: '孩子端详细数据列表',
    path: 'manager/user/analyze/child/list',
    code: '10098'
  },
  {
    name: '家长端总体数据导出 - 家长端',
    path: 'manager/user/analyze/list/export',
    code: '10090'
  },
  {
    name: '孩子端总体数据导出',
    path: 'manager/user/analyze/child/list/export',
    code: '10061'
  },
  // 用户邀请注册
  {
    name: '邀请注册活动详情',
    path: 'manager/user/invite/register/activity/info',
    code: '10075'
  },
  {
    name: '编辑邀请注册活动',
    path: 'manager/user/invite/register/activity/edit',
    code: '10083'
  },
  {
    name: '用户邀请注册统计列表',
    path: 'manager/user/invite/register/statistics/list',
    code: '10059'
  },
  {
    name: '邀请好友数据导出',
    path: 'manager/user/invite/register/statistics/list/export',
    code: '10094'
  },
  // 设备管理
  {
    name: '为孩子解绑设备',
    path: 'manager/device/unbind',
    code: '10036'
  },
  {
    name: '获取设备信息列表',
    path: 'manager/device/info/list',
    code: '10091'
  },
  {
    name: '设备信息管理导出',
    path: '/manager/device/info/list/export',
    code: '10025'
  },
  // 应用推荐管理
  {
    name: '推荐应用列表',
    path: 'manager/soft/recommend/list',
    code: '10006'
  },
  {
    name: '创建推荐应用',
    path: 'manager/soft/recommend/add',
    code: '10046'
  },
  {
    name: '编辑推荐应用',
    path: 'manager/soft/recommend/edit',
    code: '10055'
  },
  {
    name: '禁用推荐应用',
    path: 'manager/soft/recommend/delete',
    code: '10060'
  },
  {
    name: '搜索应用(从应用市场)',
    path: 'manager/soft/recommend/mark/search',
    code: '10111'
  },
  {
    name: '获取推荐应用组合',
    path: 'manager/soft/recommend/group/list',
    code: '10068'
  },
  {
    name: '创建推荐应用组合',
    path: 'manager/soft/recommend/group/add',
    code: '10066'
  },
  {
    name: '禁用推荐应用组合',
    path: 'manager/soft/recommend/group/delete',
    code: '10101'
  },
  {
    name: '推荐应用组合详情',
    path: 'manager/soft/recommend/group/detail',
    code: '10109'
  },
  {
    name: '发布或撤销应用组合',
    path: 'manager/soft/recommend/group/publish',
    code: '10103'
  },
  {
    name: '编辑推荐应用组合',
    path: 'manager/soft/recommend/group/edit',
    code: '10003'
  },
  {
    name: '获取推荐应用专题',
    path: 'manager/soft/recommend/subject/list',
    code: '10041'
  },
  {
    name: '创建推荐应用专题',
    path: 'manager/soft/recommend/subject/add',
    code: '10023'
  },
  {
    name: '编辑推荐应用专题',
    path: 'manager/soft/recommend/subject/edit',
    code: '10013'
  },
  {
    name: '禁用推荐应用专题',
    path: 'manager/soft/recommend/subject/delete',
    code: '10056'
  },
  {
    name: '推荐应用专题详情',
    path: 'manager/soft/recommend/subject/detail',
    code: '10104'
  },
  {
    name: '应用专题上下架',
    path: 'manager/soft/recommend/subject/publish',
    code: '10000'
  },
  // 常见问题管理
  {
    name: '获取常见问题类别',
    path: 'manager/qa/type/list',
    code: '10112'
  },
  {
    name: '添加常见问题类别',
    path: 'manager/qa/type/add',
    code: '10122'
  },
  {
    name: '编辑常见问题类别',
    path: 'manager/qa/type/edit',
    code: '10108'
  },
  {
    name: '删除常见问题类别',
    path: 'manager/qa/type/delete',
    code: '10099'
  },
  {
    name: '发布或撤销发布问题',
    path: 'manager/qa/publish',
    code: '10062'
  },
  {
    name: '获取问题详情',
    path: 'manager/qa/detail',
    code: '10119'
  },
  {
    name: '删除常见问题',
    path: 'manager/qa/delete',
    code: '10042'
  },
  {
    name: '分页获取常见问题',
    path: 'manager/qa/list',
    code: '10010'
  },
  {
    name: '编辑常见问题',
    path: 'manager/qa/edit',
    code: '10086'
  },
  {
    name: '创建常见问题',
    path: 'manager/qa/add',
    code: '10020'
  },
  // 应用版本管理
  {
    name: '获取版本分布情况',
    path: 'manager/app/version/distribution',
    code: '10071'
  },
  {
    name: '获取应用版本列表',
    path: 'manager/app/version/list',
    code: '10021'
  },
  {
    name: '获取应用版本',
    path: 'manager/app/version/get',
    code: '10121'
  },
  {
    name: '批量推送App版本更新',  // 家长端
    path: 'manager/app/version/send/command',
    code: '10063'
  },
  {
    name: '添加应用版本记录',
    path: 'manager/app/version/add',
    code: '10029'
  },
  {
    name: '启动停止应用版本',
    path: 'manager/app/version/startup',
    code: '10050'
  },
  {
    name: '编辑应用版本',
    path: 'manager/app/version/update',
    code: '10016'
  },
  // 订单模块
  {
    name: '获取订单列表',
    path: 'manager/order/list',
    code: '10005'
  },
  {
    name: '导出订单列表', // 用户管理 - 订单管理
    path: 'manager/order/list/export',
    code: '10018'
  },
  {
    name: '家长信息管理交易记录',
    path: 'manager/order/list/trading/record',
    code: '10065'
  },
  // 会员模块
  {
    name: '获取会员套餐列表',
    path: 'manager/member/plan/list',
    code: '10092'
  },
  {
    name: '获取所有会员套餐列表',
    path: 'manager/member/plan/list/all',
    code: '10221'
  },
  {
    name: '创建会员套餐',
    path: 'manager/member/plan/add',
    code: '10049'
  },
  {
    name: '编辑会员套餐',
    path: 'manager/member/plan/edit',
    code: '10014'
  },
  {
    name: '删除会员套餐',
    path: 'manager/member/plan/delete',
    code: '10077'
  },
  {
    name: '获取会员活动列表',
    path: 'manager/member/activity/list',
    code: '10004'
  },
  {
    name: '获取会员活动详情',
    path: 'manager/member/activity/info',
    code: '10132'
  },
  {
    name: '获取指定活动的参与用户',
    path: 'manager/member/activity/user/list',
    code: '10002'
  },
  {
    name: '创建会员活动',
    path: 'manager/member/activity/add',
    code: '10072'
  },
  {
    name: '编辑会员活动',
    path: 'manager/member/activity/edit',
    code: '10073'
  },
  {
    name: '删除会员活动',
    path: 'manager/member/activity/delete',
    code: '10037'
  },
  {
    name: '获取会员充值流水',
    path: 'manager/member/plan/flow/list',
    code: '10045'
  },
  {
    name: '湖南电信SP退定',
    path: 'manager/member/monthlyplan/unsubscribe/ctccsp',
    code: '10079'
  },
  {
    name: '邀请好友配置',
    path: '/manager/member/invitation/config',
    code: '10009'
  },
  {
    name: '会员套餐下架/上架',
    path: 'manager/member/plan/isListing',
    code: '10039'
  },
  // 广告模块
  {
    name: '获取广告列表',
    path: 'manager/advertising/list',
    code: '10027'
  },
  {
    name: '创建广告',
    path: 'manager/advertising/add',
    code: '10052'
  },
  {
    name: '编辑广告',
    path: 'manager/advertising/edit',
    code: '10028'
  },
  {
    name: '删除广告',
    path: 'manager/advertising/delete',
    code: '10007'
  },
  {
    name: '广告下架/上架',
    path: 'manager/advertising/isListing',
    code: '10057'
  },
  // 意见反馈
  {
    name: '获取意见反馈类别',
    path: 'common/feedback/type/list',
    code: '10100'
  },
  {
    name: '添加意见反馈类别',
    path: 'manager/feedback/type/add',
    code: '10120'
  },
  {
    name: '编辑意见反馈类别',
    path: 'manager/feedback/type/edit',
    code: '10107'
  },
  // 系统参数
  {
    name: '获取系统参数列表',
    path: '/manager/sys/param/list',
    code: '10074'
  },
  {
    name: '获取系统参数详情',
    path: '/manager/sys/param/get',
    code: '10114'
  },
  {
    name: '添加系统参数',
    path: '/manager/sys/param/add',
    code: '10048'
  },
  {
    name: '编辑系统参数',
    path: '/manager/sys/param/edit',
    code: '10044'
  },
  {
    name: '批量删除系统参数',
    path: '/manager/sys/param/delete',
    code: '10012'
  },
  {
    name: '获取系统类型列表',
    path: '/manager/sys/param/get/type/list',
    code: '10131'
  },
  {
    name: '根据bundleId获取应用名称',
    path: '/manager/index/querySoftByBundleId',
    code: '10126'
  },
  {
    name: '小程序管理列表',
    path: '/manager/miniprogram/list',
    code: '10130'
  },
  {
    name: '小程序管理-新增',
    path: '/manager/miniprogram/add',
    code: '10129'
  },
  {
    name: '小程序管理-编辑',
    path: '/manager/miniprogram/edit',
    code: '10128'
  },
  {
    name: '小程序管理-删除',
    path: '/manager/miniprogram/del',
    code: '10127'
  },
  // 高危应用
  {
    name: '高危应用列表',
    path: '/manager/risk/soft/list',
    code: '10022'
  },
  {
    name: '获取高危软件详情',
    path: '/manager/risk/soft/get',
    code: '10113'
  },

  {
    name: '添加高危软件',
    path: '/manager/risk/soft/add',
    code: '10087'
  },
  {
    name: '编辑高危软件',
    path: '/manager/risk/soft/edit',
    code: '10054'
  },

  {
    name: '批量删除高危软件',
    path: '/manager/risk/soft/delete',
    code: '10011'
  },
  // 注册来源
  {
    name: '获取注册来源列表',
    path: 'manager/channel/list',
    code: '10080'
  },
  {
    name: '获取当前登录用户相同角色用户',
    path: 'manager/channel/associated/user',
    code: '10226'
  },
  {
    name: '获取指定注册来源详情',
    path: 'manager/channel/info',
    code: '10097'
  },
  {
    name: '编辑/保存注册来源 - 新增渠道',
    path: 'manager/channel/saveOrUpdate',
    code: '10043'
  },
  {
    name: '编辑/保存注册来源 - 更新',
    path: 'manager/channel/saveOrUpdate',
    code: '10067'
  },
  // 电信SP
  // 短信记录
  {
    name: '文本短信记录',
    path: '/manager/sms/query/record',
    code: '10015'
  },
  {
    name: '语音短信列表',
    path: '/manager/voice/query/record',
    code: '10081'
  },
  // 权限
  {
    name: '获取用户权限',
    path: '/manager/user/permission/find',
    code: '99999'
  },
  {
    name: '初始化权限',
    path: 'manager/funCode/initialize',
    code: '99800'
  },
  {
    name: '获取权限列表',
    path: 'manager/funCode/list',
    code: '10058'
  },
  // 角色
  {
    name: '获取角色列表',
    path: 'manager/sysRole/list',
    code: '10035'
  },
  {
    name: '获取所有角色列表',
    path: 'manager/sysRole/list/all',
    code: '10220'
  },
  {
    name: '查询角色信息',
    path: 'manager/sysRole/info',
    code: '10123'
  },
  {
    name: '创建或者编辑角色 - 创建角色',
    path: 'manager/sysRole/saveOrUpdate',
    code: '10008'
  },
  {
    name: '创建或者编辑角色 - 编辑角色',
    path: 'manager/sysRole/saveOrUpdate',
    code: '10031'
  },
  {
    name: '删除系统角色',
    path: 'manager/sysRole/delete',
    code: '10093'
  },
  // 工单系统
  {
    name: '获取用户未读消息数',
    path: 'manager/ticket/message/unreadCount',
    code: '10244'
  },
  {
    name: '工单列表接口',
    path: 'manager/ticket/list',
    code: '10230'
  },
  {
    name: '工单导出',
    path: 'manager/ticket/list/export',
    code: '10249'
  },
  {
    name: '模糊查询已经创建工单标题',
    path: 'manager/ticket/title/query',
    code: '10238'
  },
  {
    name: '根据手机号码查询家长信息',
    path: 'manager/ticket/patriarch/detail',
    code: '10234'
  },
  {
    name: '创建工单',
    path: 'manager/ticket/save',
    code: '10231'
  },
  {
    name: '更新工单 、重新打开工单、关闭工单',
    path: 'manager/ticket/update',
    code: '10229'
  },
  {
    name: '转交工单',
    path: 'manager/ticket/change/record',
    code: '10239'
  },
  {
    name: '添加评论',
    path: 'manager/ticket/comment/add',
    code: '10227'
  },
  {
    name: '评论列表',
    path: 'manager/ticket/comment/list',
    code: '10228'
  },
  {
    name: '更新我受理工单的评论',
    path: 'manager/ticket/update/assigned',
    code: '10240'
  },
  {
    name: '变更历史',
    path: 'manager/ticket/change/record',
    code: '10241'
  },
  {
    name: '工单信息',
    path: 'manager/ticket/info',
    code: '10232'
  },
  {
    name: '历史关联工单',
    path: 'manager/ticket/associated/list',
    code: '10242'
  },
  {
    name: '工单关联用户',
    path: 'manager/ticket/associated/user',
    code: '10236'
  },
  {
    name: '最新消息',
    path: 'manager/ticket/last/message',
    code: '10237'
  },
  {
    name: '多级联动 - 新增',
    path: 'manager/ticket/type/add',
    code: '10233'
  },
  {
    name: '逐级获取多级联动',
    path: 'manager/ticket/type/list',
    code: '10235'
  },
  {
    name: '多级联动-编辑',
    path: 'manager/ticket/type/edit',
    code: '10243'
  }
]
