import { v1 as uuidv1 } from 'node-uuid'
import {
  DATE_FORMAT,
  GRADE_LIST,
  SUBJECT_LIST
} from '@/utils/constant'
import dayjs from 'dayjs'
import CryptoJS from 'crypto-js'

/*
* 获得页面视窗高度
* */
export function get_client_height() {
  let clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  } else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  }
  return clientHeight
}

export function get_uuid() {
  const string = uuidv1()
  return string.replace(/-/g, '').toUpperCase()
}

export function is_array(obj) {
  return typeof obj === 'object' && obj.constructor === Array
}

/*
* 格式化时间
* */
export function date_formatter(date, fomatter = DATE_FORMAT, is_filled = false) {
  if (date) {
    return dayjs(date).format(fomatter)
  } else {
    if (is_filled) {
      return dayjs().format(fomatter)
    } else {
      return date
    }
  }
}

/*
* 获取指定时间当天的时间戳，取起始时间
* */
export function get_start_or_end_timestamp(date, is_start = true, is_timestamp = false) {
  const time = date_formatter(date, DATE_FORMAT)
  let time_string
  if (is_start) {
    time_string = time + ' 00:00:00'
  } else {
    time_string = time + ' 23:59:59'
  }
  if (is_timestamp) {
    return new Date(time_string).getTime()
  } else {
    return time_string
  }
}

export function transfer_to_chinese_index(index) {
  const __chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  return __chinese[+index]
}

// 性别映射
export function get_sex_label(sex) {
  if (sex === '0') {
    return '女'
  } else if (+sex === 1) {
    return '男'
  } else {
    return '不限'
  }
}

// 年级对应标签列表
export function get_grade_label_map() {
  const grade_map = {}
  GRADE_LIST.forEach((r, i, _a) => {
    grade_map[r.val] = r.name
  })
  return grade_map
}

// 交易金额
export function formatter_transaction_amount(fee, unit = '元') {
  const num = +fee
  return num.toFixed(2) + unit
}

// 获取单个年级对应标签
export function get_grade_label(grade) {
  const grade_map = get_grade_label_map()
  return grade_map[+grade]
}

// 年级数字列表转换面年级标签列表
export function grade_number_map_label(grades) {
  return GRADE_LIST.filter(r => grades.indexOf(r.val) !== -1).map(r => r.name)
}

// 学科标签列表
export function get_subject_label_map(subject) {
  const subject_map = {}
  SUBJECT_LIST.forEach((r, i, _a) => {
    subject_map[r.val] = r.name
  })
  return subject_map
}

// 获取单个学科标签
export function get_subject_label(subject) {
  const subject_map = get_subject_label_map()
  return subject_map[+subject]
}

// 学科数字列表转换学科标签列表
export function subject_number_map_label(subjects) {
  if (subjects === undefined) {
    return []
  } else {
    return SUBJECT_LIST.filter(r => subjects.indexOf(r.val) !== -1).map(r => r.name)
  }
}

// 学科标签列表转换学科数字列表
export function subject_label_map_number(subjects) {
  return SUBJECT_LIST.filter(r => subjects.indexOf(r.name) !== -1).map(r => r.val)
}

// 组合状态别名
export function get_app_combination_status(rec_type, status) {
  if (rec_type === '1') {
    if (['01', '1'].indexOf(status) !== -1) {
      return '未生效'
    } else {
      return '生效中'
    }
  } else {
    if (['01', '1'].indexOf(status) !== -1) {
      return '未推送'
    } else {
      return '已推送'
    }
  }
}

// 组合状态别名
export function get_rec_type_label(rec_type) {
  if (rec_type === '1') {
    return '系统推荐'
  } else {
    return '手动推荐'
  }
}

export function build_version() {
  return dayjs().format('YYYYMMDDHHmm')
}

function arrayBufferToWordArray(ab) {
  const i8a = new Uint8Array(ab)
  const a = []
  for (let i = 0; i < i8a.length; i += 4) {
    a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3])
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length)
}

export function calculate_file_sha256(file) {
  return new Promise(resolve => {
    const file_reader = new FileReader()
    file_reader.readAsArrayBuffer(file)
    file_reader.onload = (e) => {
      const hexstring = CryptoJS.SHA256(arrayBufferToWordArray(e.target.result)).toString()
      resolve(hexstring)
    }
  })
}

/*
* 去除对象内空值
* */
export function pure_object_null_value(data, options = ['null', 'trim']) {
  const is_remove_null = options.indexOf('null') !== -1
  const is_trim = options.indexOf('trim') !== -1
  for (const key in data) {
    // 去除空对象
    const value = data[key]
    if (is_remove_null && [null, '', undefined].indexOf(value) !== -1) {
      delete data[key]
      continue
    }
    // 去除前后空白字符
    if (is_trim) {
      data[key] = String(data[key]).trim()
    }
  }
  return data
}

/*
* 字典列表中取出键对应的值
* 参数 key: 键值名
* 参数 map_list: 键值序列列表
* 参数 default_value: 无键值匹配时默认值
*  */
export function get_value_from_map_list(key, map_list = [], default_value = '-', map_list_type = '1') {
  // map_list_type map_list的格式
  if (map_list_type === '1') {
    const filter_item = map_list.find(r => r.value === key)
    if (filter_item) {
      return filter_item.label
    }
  } else if (map_list_type === '2') {
    const filter_item = map_list.find(r => r.val === key)
    if (filter_item) {
      return filter_item.name
    }
  }
  return default_value
}

/*
* 获取环境配置的URL
* */
export function get_h5_domain() {
  let domain
  const hostname = window.location.hostname
  hostname === 'bms-dev.qcg.cc' && (domain = 'h5-dev.qcg.cc')
  hostname === 'bms-test1.qcg.cc' && (domain = 'h5-test1.qcg.cc')
  hostname === 'bms-test2.qcg.cc' && (domain = 'h5-test2.qcg.cc')
  hostname === 'bms-beta.qcg.cc' && (domain = 'h5-beta.qcg.cc')
  hostname === 'bms.qcg.cc' && (domain = 'h5.qcg.cc')
  domain === undefined && (domain = 'h5-dev.qcg.cc')
  return 'https://' + domain
  /* let domain
  const hostname = window.location.hostname
  if (['g8ddev.dev.zhixike.net', 'g8dtes.dev.zhixike.net', 'g8dtes2.dev.zhixike.net'].indexOf(hostname) !== -1) {
    // 开发与测试环境
    domain = hostname
  } else if (hostname === 'greenguard-bms-beta.gwchina.cn') {
    // Beta环境
    domain = 'greenguard-h5-beta.gwchina.cn'
  } else if (hostname === 'greenguard-bms.gwchina.cn') {
    // 线上环境
    domain = 'greenguard-h5.gwchina.cn'
  } else if (hostname === 'greenguard-bms-beta.qcgelei.com') {
    // Beta1环境
    domain = 'greenguard-h5-beta.qcgelei.com'
  } else if (hostname === 'greenguard-bms.qcgelei.com') {
    // Prod1线上环境
    domain = 'greenguard-h5.qcgelei.com'
  } else {
    // 其它转到开发环境域名
    domain = 'g8ddev.dev.zhixike.net'
  }
  return 'https://' + domain*/
}

/*
* 扁平化目录结构树
* */
export function delayering_page_tree(data_list) {
  const data_row = []

  // 扁平化树型结构
  function recursive(data_list, parent = {}, level = 0) {
    const pcode = parent.code || 0
    data_list.map(r => {
      const { children } = r
      delete r.children
      const row = r
      row['pcode'] = pcode
      row['level'] = level
      data_row.push(row)
      if (children.length) {
        recursive(children, r, level + 1)
      }
    })
  }

  recursive(data_list)
  return data_row
}

/*
* 生成指定范围内的随机值
* @param {Number} _min 随机值的最小值
* @param {Number} _max 随机值的最大值
* */
export function sync_message_interval_seconds(_min, _max) {
  if (_min === _max) {
    return _min
  } else {
    return Math.floor(Math.random() * (_max - _min)) + _min
  }
}
