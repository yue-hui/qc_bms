import { v1 as uuidv1 } from 'node-uuid'
import { DATE_FORMAT, GRADE_LIST, SUBJECT_LIST } from '@/utils/constant'
import dayjs from 'dayjs'

export function get_uuid() {
  const string = uuidv1()
  return string.replace(/-/g, '').toUpperCase()
}

export function date_formatter(date, fomatter = DATE_FORMAT) {
  let day_js
  if (date) {
    day_js = dayjs(date)
  } else {
    day_js = dayjs()
  }
  return day_js.format(fomatter)
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
