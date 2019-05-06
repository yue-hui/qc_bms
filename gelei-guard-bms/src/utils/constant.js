/* 签名时间偏移量 */
export const SIGN_DELTA_TIME = 24 * 60 * 60 * 1000

/* 系统常量配置 */
export const SYSTEM_CONSTANT = {
  'name': '格雷守护 - 后台管理系统',
  'title': '格雷守护'
}

/* 前端首页URL */
export const HOME_PATH = '/users/information'

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
export const DEFAULT_PAGE_SIZE = 10

// 日期格式
export const DATE_FORMAT = 'YYYY-MM-DD'

// 日期格式以点分隔
export const DATE_FORMAT_WITH_POINT = 'YYYY.MM.DD'

// 日期时间格式
export const DATE_MINUTE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 日期时间格式
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 一天的微秒数
export const DAY_MICROSECOND = 3600 * 24 * 1000

// 统计详情数据名称
export const ANALYSIS_DETAILS_NAME = '统计详情数据'

// 统计详情数据名称
export const ORDER_MANAGEMENT_LIST_NAME = '订单管理数据'

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

// 订单状态
export const ORDER_STATUS_LIST = [
  {
    value: 1,
    label: '所有'
  },
  {
    value: 2,
    label: '待支付'
  },
  {
    value: 3,
    label: '已完成'
  }
]

// 交易方式
export const TRANSCATION_MODE = [
  {
    value: 1,
    label: '所有'
  },
  {
    value: 2,
    label: '待支付'
  },
  {
    value: 3,
    label: 'IOS内购'
  },
  {
    value: 4,
    label: '支付宝'
  },
  {
    value: 5,
    label: '微信'
  },
  {
    value: 6,
    label: '营销抵扣'
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
  }
]

/* 会员活动管理 */

// 活动类型
export const ACTIVITY_TYPES = [
  {
    value: '01',
    label: '会员充值活动'
  },
  {
    value: '02',
    label: '积分赠送活动'
  }
]
