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
export const min_weight = 0
export const max_weight = 3

// 分页参数
export const DEFAULT_PAGE_SIZE = 10

// 日期格式
export const DATE_FORMAT = 'YYYY-MM-DD'

// 日期时间格式
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 一天的微秒数
export const DAY_MICROSECOND = 3600 * 24 * 1000

// 统计详情数据名称
export const ANALYSIS_DETAILS_NAME = '统计详情数据'

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
