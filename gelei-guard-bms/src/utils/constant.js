/* 签名时间偏移量 */
// import { extendPath } from 'echarts/src/util/graphic'

export const SIGN_DELTA_TIME = 24 * 60 * 60 * 1000

/* 系统常量配置 */
export const SYSTEM_CONSTANT = {
  'name': '格雷盒子 - 后台管理系统',
  'title': '格雷盒子'
}

/* 表格长度 */
export const TABLE_PAGE_SIEZS_LIST = [10, 20, 50, 100]

/* 导出数据记录上限值 */
export const EXPORT_MAX_RECORD_LENGTH = 10000
/* 超过导出上限时的提示语 */
export const EXPORT_OVER_MAX_TIPS_REMINDER = '最多只能导出1W条数据噢!'

/* 前端首页URL */
export const HOME_PATH = '/welcome'

/* 商务注册页默认图片 */
export const BUSINESS_COOPERATION_DEFAULT_PICTURE = 'https://file.gwchina.cn/437EC0AC7F0000015E2BBF4849643C96/2020/3/a27604af6cfd7ee13ea8c60b7738cd738e7424068a4b971c07f101043286e04e.png'

// export const SAY_TO_USER_WITH_404 = '网管说这个页面你不能进......'
export const SAY_TO_USER_WITH_404 = '此页只因天上有，不须此行在人间......'

// 中文序列号
const CHINESE_INDEX = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

// 获取中文序列号
export function get_chinese_index(idx) {
  const index = +idx
  if (index < CHINESE_INDEX.length) {
    return CHINESE_INDEX[idx]
  } else {
    return idx
  }
}

// 帮助问题权重范围
export const min_weight = 1
export const max_weight = 3

// 分页参数
export const DEFAULT_PAGE_SIZE = 100

// dayjs 日期格式,中文
export const DATE_FORMAT_WITH_CN = 'YYYY年MM月DD日'

// dayjs 日期格式
export const DATE_FORMAT = 'YYYY-MM-DD'

// 日期格式无分隔
export const DATE_FORMAT_WITH_NONE = 'YYYYMMDD'

// 日期格式以点分隔
export const DATE_FORMAT_WITH_POINT = 'YYYY.MM.DD'

// 日期时间格式到分钟
export const DATE_MINUTE_FORMAT = 'YYYY-MM-DD HH:mm'

// 日期时间格式到分钟 - 紧凑格式
export const DATE_MINUTE_COMPACT_FORMAT = 'YYYYMMDDHHmm'

// 日期时间格式
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 一天的微秒数
export const DAY_MICROSECOND = 3600 * 24 * 1000

// 统计详情数据名称
export const ANALYSIS_DETAILS_NAME = '统计详情数据'

// 订单管理列表表格名称
export const ORDER_MANAGEMENT_LIST_NAME = '订单管理数据'

// 设备信息管理列表名称
export const DEVICE_MANAGE_LIST_NAME = '设备信息管理'

// 学科列表
export const SUBJECT_LIST = [
  {
    name: '语文',
    val: '1'
  },
  {
    name: '数学',
    val: '2'
  },
  {
    name: '英语',
    val: '3'
  },
  {
    name: '物理',
    val: '4'
  },
  {
    name: '化学',
    val: '5'
  },
  {
    name: '生物',
    val: '6'
  },
  {
    name: '历史',
    val: '7'
  },
  {
    name: '地理',
    val: '8'
  },
  {
    name: '政治',
    val: '9'
  },
  {
    name: '其他',
    val: '10'
  }
]

// 年级列表
export const GRADE_LIST = [
  {
    name: '一年级以下',
    val: '0'
  },
  {
    name: '一年级',
    val: '1'
  },
  {
    name: '二年级',
    val: '2'
  },
  {
    name: '三年级',
    val: '3'
  },
  {
    name: '四年级',
    val: '4'
  },
  {
    name: '五年级',
    val: '5'
  },
  {
    name: '六年级',
    val: '6'
  },
  {
    name: '初一',
    val: '7'
  },
  {
    name: '初二',
    val: '8'
  },
  {
    name: '初三',
    val: '9'
  },
  {
    name: '高一',
    val: '10'
  },
  {
    name: '高二',
    val: '11'
  },
  {
    name: '高三',
    val: '12'
  },
  {
    name: '大学',
    val: '13'
  }
]

// 性别列表
export const SEX_LIST = [
  {
    name: '女',
    val: '0'
  },
  {
    name: '男',
    val: '1'
  },
  {
    name: '不限',
    val: '2'
  }
]

// 生成年级对应的表格
export function grade_reflect_name(grade) {
  if (grade === 0 || grade === '0') {
    return '小学以下'
  }
  const __grade = +grade
  const select_grade = GRADE_LIST.filter(r => r.val === __grade)
  if (select_grade.length) {
    return select_grade[0]['name']
  } else {
    return '未知年级 - ' + grade
  }
}

// 十星等级列表
export const RATE_STARTS_COLOR = ['#b9b9b9', '#bdbdbd', '#b8b8b8', '#8c8c8c', '#5e5e5e',
  '#444444', '#404040', '#303030', '#121212', '#000000']

// 当前版本号
export const __VERSION__ = '201902281003'

// 当前版本号
export const PagenationSizeKey = 'page_sizes_1'

// 正浮点数
export const POSITIVE_FLOAT = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/

// 订单来源 - 订单详情
export const COMMODITY_TYPE = [
  {
    value: 1,
    label: '所有'
  },
  {
    value: 2,
    label: '格雷守护会员月卡'
  },
  {
    value: 3,
    label: '格雷守护会员季卡'
  },
  {
    value: 4,
    label: '格雷守护会员年卡'
  }
]

// 套餐类型
export const PACKAGE_TYPE = [
  {
    value: null,
    label: '所有'
  },
  {
    value: '01',
    label: '公开'
  },
  {
    value: '02',
    label: '不公开'
  }
]

// 套餐当前状态
export const PACKAGE_STATUS = [
  {
    value: null,
    label: '所有'
  },
  {
    value: '1',
    label: '已上架'
  },
  {
    value: '0',
    label: '未上架'
  }
]

// 广告类型
export const ADVERTISEMENT_TYPE = [
  {
    value: 1,
    label: '固定位置'
  },
  {
    value: 2,
    label: '开屏弹屏'
  },
  {
    value: 3,
    label: '悬浮按钮'
  }
]

// 广告位置
export const ADVERTISEMENT_LOCATIONS = [
  {
    value: 1,
    label: '首页卡片'
  },
  {
    value: 2,
    label: '绑定流程定制机图片'
  },
  {
    value: 3,
    label: '绑定流程广告'
  },
  {
    value: 4,
    label: '会员页面广告'
  }
]

// 广告状态
export const ADVERTISEMENT_STATUS = [
  {
    value: null,
    label: '所有'
  },
  {
    value: '1',
    label: '生效中'
  },
  {
    value: '0',
    label: '未生效'
  }
]

// 广告跳转平台
export const ADVERTISEMENT_PLATFORM = [
  {
    value: '01',
    label: 'APP原生页'
  },
  {
    value: '02',
    label: 'H5'
  },
  {
    value: '03',
    label: '微信小程序'
  },
  {
    value: '无',
    label: '无'
  }
]

/* 会员活动管理 */

// 活动类型
export const MEMBER_ACTIVITY_TYPES = [
  {
    value: '01',
    label: '会员充值活动'
  },
  {
    value: '02',
    label: '积分赠送活动'
  }
]

// 平台类型
export const ADVERTISE_PLATFORM_TYPES = [
  {
    value: '01',
    label: '格雷盒子家长端'
  },
  {
    value: '02',
    label: '格雷盒子孩子端'
  }
]

// 帮助与反馈 - 展现形式
export const HELP_SHOW_TYPES = [
  {
    value: '01',
    label: '富文本内容'
  },
  {
    value: '02',
    label: 'H5链接'
  }
]

// 活动类型
export const OPERATORS_ACTIVITY_TYPES = [
  {
    value: '01',
    label: '虚拟商品'
  }, {
    value: '02',
    label: '实物'
  }
]

// 业务会员类型
export const PATRIARCH_MEMBER_TYPES = [
  {
    value: '01',
    label: '体验用户'
  },
  {
    value: '04',
    label: '电信会员'
  },
  {
    value: '02',
    label: '高级会员'
  },
  {
    value: '03',
    label: '普通会员'
  }
]

// 系统会员类型ID列表
export const SYSTEM_PATRIARCH_MEMBER_TYPES_IDS = ['02', '03']

// 套餐对象（会员减免）
export const MEMBER_PACKAGE_OBJECTS = [
  {
    value: '1',
    label: '付费用户'
  },
  {
    value: '0',
    label: '非付费用户'
  }
]

// 已开通会员信息
export const ORDERED_MEMBER_STATUS_LABEL = [
  {
    value: '00',
    label: '待生效'
  },
  {
    value: '01',
    label: '生效中'
  },
  {
    value: '02',
    label: '已失效'
  }
]

// 设备使用间隔
export const DEVICE_USER_INTERVALS = [
  {
    value: '01',
    label: '每小时'
  },
  {
    value: '02',
    label: '每天'
  }
]

// 孩子设备类型
export const DEVICE_TYPE_LIST = [
  {
    value: '01',
    label: 'PC'
  },
  {
    value: '02',
    label: 'IOS'
  },
  {
    value: '03',
    label: 'Android'
  }
]

// 孩子设备绑定状态
export const CHILD_BIND_TYPE_STATUS = [
  {
    value: '2',
    label: '未绑定'
  },
  {
    value: '1',
    label: '绑定中'
  },
  {
    value: '0',
    label: '已解绑'
  }
]

/*
* 账户管理
* */

export const SYSTEM_ACCOUNT_ENABLE_STATE = [
  {
    value: '0',
    label: '禁用'
  },
  {
    value: '1',
    label: '启用'
  }
]

// 基数1W
export const W_CONSTANT = 10000

/* 消息推送模块 */
export function push_status(value) {
  switch (value) {
    case '1': return '已发送'
    case '0': return '未发送'
  }
}
export function push_platform(value) {
  switch (value) {
    case '01': return '格雷守护'
    case '02': return '格雷盒子'
    case '03': return '智习客'
    case '04': return '格雷优选'
  }
}

// 用户账号类型
export const ACCOUNT_NAME_LIST = [
  {
    value: '00',
    label: '果果职工'
  },
  {
    value: '01',
    label: '代理商'
  }
]
