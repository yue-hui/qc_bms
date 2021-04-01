const PAGE_PERMISSION = [
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
    path: 'common/user/regFrom/list',
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
    name: '获取设备的应用使用记录',  // 家长端
    path: 'manager/device/getAppUsage',
    code: '40009'
  },
  {
    name: '秒传接口',  // 家长端
    path: 'file/data/secondpass',
    code: '40019'
  },
  {
    name: '文件上传接口',  // 家长端
    path: 'file/data/upload',
    code: '40020'
  },
  {
    name: '获取广告类型列表',  // 家长端
    path: 'common/advertising/type/list',
    code: '40027'
  },
  {
    name: '获取广告位置列表',  // 家长端
    path: 'common/advertising/point/list',
    code: '40028'
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
    name: '保存或者编辑用户信息 - 编辑角色',
    path: 'manager/user/saveOrUpdate',
    code: '10064'
  },
  {
    name: '保存或者编辑用户信息 - 新增角色',
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
    code: ''
  },
  {
    name: '初始化权限',
    path: 'manager/funCode/initialize',
    code: ''
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
    name: '查询角色信息',
    path: 'manager/sysRole/info',
    code: '10123'
  },
  {
    name: '创建或者编辑角色',
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
  }
]

/* 公共接口 */
const PLUBIC_INTERFACE = [
  'common/get/verify/code',
  'common/user/regFrom/list',
  'common/order/type/list',
  'common/order/status/list',
  'common/order/paytype/list',
  'manager/device/getAppUsage',
  'file/data/secondpass',
  'file/data/upload',
  'common/advertising/type/list',
  'common/advertising/point/list',
  'manager/user/login',
  'manager/user/logout',
  'manager/user/detail',
  // 'manager/user/password/edit',
  // 'manager/user/imgUrl/update',
  '/manager/user/permission/find'
]

const ADMIN_INTERFACE = [
  'manager/funCode/initialize'
]

function introspection_interface() {
  const duplicate_name = {}
  const duplicate_code = {}
  const duplicate_path = {}
  const start_4_items = []
  PAGE_PERMISSION.map(r => {
    const { name, path, code } = r
    if (PLUBIC_INTERFACE.indexOf(path) !== -1) {
      // 过滤公共接口
      return null
    }
    if (ADMIN_INTERFACE.indexOf(path) !== -1) {
      // 过滤超级管理员接口
      return null
    }
    if (name in duplicate_name) {
      duplicate_name[name].push(r)
    } else {
      duplicate_name[name] = [r]
    }
    if (code in duplicate_code) {
      duplicate_code[code].push(r)
    } else {
      duplicate_code[code] = [r]
    }
    if (path in duplicate_path) {
      duplicate_path[path].push(r)
    } else {
      duplicate_path[path] = [r]
    }
    if (parseInt(+code / 10000) === 4) {
      start_4_items.push(r)
    }
  })
  // 重接口名
  console.info('\n接口名重复:')
  for (const key in duplicate_name) {
    const name_list = duplicate_name[key]
    if (name_list.length > 1) {
      const path_list = name_list.map(r => r.path)
      console.warn('\t', key, ' : ', path_list.join(', '))
    }
  }
  // 重接口路径
  console.info('\n接口路径重复:')
  for (const key in duplicate_path) {
    const path_list = duplicate_path[key]
    if (path_list.length > 1) {
      const name_list = path_list.map(r => r.name)
      console.error('\t', key, ': ', name_list.join(', '))
    }
  }
  // 重接口code值
  console.info('\n权限值重复:')
  for (const key in duplicate_code) {
    const code_list = duplicate_code[key]
    if (code_list.length > 1) {
      if (key) {
        const path_list = code_list.map(r => r.path)
        console.error('\t', key, ' : ', path_list.join(', '))
      }
    }
  }
  // 未分配权限接口
  if ('' in duplicate_code) {
    const unassigned_authorize_code = duplicate_code['']
    console.info('\n未分配function_code接口:')
    unassigned_authorize_code.map(r => {
      console.warn('\t', r.name, ' - ', r.path)
    })
  } else {
    console.info('\n所有接口都已分配function_code.')
  }

  // 4w打头的code
  console.info('\n未处理的4xxxx接口:')
  start_4_items.map(r => {
    console.warn('\t', r.name, ' - ', r.path)
  })
}

introspection_interface()

















