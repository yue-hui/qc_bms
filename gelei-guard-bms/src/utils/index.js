/**
 * Created by jiachenpan on 16/11/18.
 */
const BigDecimal = require('js-big-decimal')
import { removeDom } from './dom.util'
import _cloneDeep from 'lodash/cloneDeep'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * @description 计算分页编号
 * @param index {Number} 索引 0 开始
 * @param currentPage {Number} 页码 1 开始
 * @param pageSize {Number} 页条数
 * */
export function computePageNumber(index, currentPage, pageSize) {
  return (currentPage - 1) * pageSize + index + 1
}
/**
 * @description 字符串超过指定长度之后出现 ...
 * @param text {String | Number}
 * @param length {Number}
 * @return text {String}
 * */
export function stringSlice(text, length = 15) {
  text = String(text)
  return text.length > length ? text.slice(0, length - 3) + '...' : text
}
/**
 * @description 根据地址/域名判断是否是本地环境
 * @param text {String}
 * @return {Boolean}
 * */
export function isLocalEnv(text) {
  text = text.replace(/^http:\/\//, '')
  return /^localhost/.test(text) || /^192\.168/.test(text)
}
/**
 * @description 根据两个数返回百分比
 * @param num1 {Number}
 * @param num2 {Number}
 * @return {String[]}
 * */
export function computePercentage(num1, num2) {
  if (num1 === 0 && num2 === 0) {
    return ['0%', '0%']
  }
  if (num1 === 0) {
    return ['0%', '100%']
  }
  if (num2 === 0) {
    return ['100%', '0%']
  }
  const count = new BigDecimal(num1).add(new BigDecimal(num2))
  const num1Pe = new BigDecimal(num1).divide(count, 2).getValue().replace(/(\.|)[0]+$/, '')
  return [new BigDecimal(num1Pe).multiply(new BigDecimal('100')).getValue() + '%',
    new BigDecimal('1').subtract(new BigDecimal(num1Pe)).multiply(new BigDecimal('100')).getValue() + '%']
}
/**
 * @description 格式化时间
 * @param dateTime {String}
 * @param time {Number}
 * @return {String}
 * */
export function parseDateTime(dateTime = 'y-m-d h:i:s', time = 0) {
  // eslint-disable-next-line one-var,prefer-const
  let date = time === 0 ? new Date() : new Date(time),
    // eslint-disable-next-line prefer-const
    y = date.getFullYear(),
    // eslint-disable-next-line prefer-const
    m = date.getMonth() + 1,
    // eslint-disable-next-line prefer-const
    d = date.getDate(),
    // eslint-disable-next-line prefer-const
    h = date.getHours(),
    // eslint-disable-next-line prefer-const
    i = date.getMinutes(),
    // eslint-disable-next-line prefer-const
    s = date.getSeconds()
  return dateTime
    .replace(/y/g, y)
    .replace(/m/g, m < 10 ? '0' + m : m)
    .replace(/d/g, d < 10 ? '0' + d : d)
    .replace(/h/g, h < 10 ? '0' + h : h)
    .replace(/i/g, i < 10 ? '0' + i : i)
    .replace(/s/g, s < 10 ? '0' + s : s)
}
/**
 * @description 从本地选择一个文件
 * @param accept {String}
 * @return Promise
 * */
export function selectLocalFile(accept = '') {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.style.display = 'none'
    input.type = 'file'
    input.accept = accept
    input.onchange = () => {
      resolve(input.files[0])
      removeDom(input)
    }
    input.click()
  })
}
/**
 * @description 获取数据类型
 * @param value {*}
 * @return {String}
 * */
export function getValueType(value) {
  return /\[object ([\w\W]+)\]/.exec(({}).toString.call(value))[1].toLowerCase()
}
/**
 * @description 深拷贝
 * @param value {*}
 * @return {*}
 * */
export function cloneDeep(value) {
  if (!['array', 'object'].includes(getValueType(value))) {
    return value
  }
  return _cloneDeep(value)
}
/**
 * @description 计算会员天数
 * @param vipEndTime {Number} 会员到期时间戳
 * @return {Number}
 * */
export function computeVipDayNumber(vipEndTime) {
  const nowTime = new Date().getTime()
  if (vipEndTime < nowTime) {
    return 0
  }
  return Math.ceil((vipEndTime - nowTime) / (24 * 60 * 60 * 1000))
}

export function getWeekRangeTime(startTime, endTime, list = []) {
  const nowData = new Date(startTime)
  nowData.setHours(0)
  nowData.setMinutes(0)
  nowData.setSeconds(0)
  nowData.setMilliseconds(0)
  const currentDay = nowData.getDay()
  const _startTime = nowData.getTime() - currentDay * 24 * 60 * 60 * 1000
  const _endTime = nowData.getTime() + (6 - currentDay) * 24 * 60 * 60 * 1000
  list.push({
    startTime: _startTime,
    endTime: _endTime,
    startDate: parseDateTime('y-m-d', _startTime),
    endDate: parseDateTime('y-m-d', _endTime)
  })
  if (startTime === endTime) {
    return list
  }
  if (_endTime < endTime) {
    getWeekRangeTime(_endTime + 24 * 60 * 60 * 1000 + 1, endTime, list)
  }
  return list
}

export function getMonthRangeTime(startTime, endTime, list = []) {
  const nowData = new Date(startTime)
  nowData.setHours(0)
  nowData.setDate(1)
  nowData.setMinutes(0)
  nowData.setSeconds(0)
  nowData.setMilliseconds(0)
  const _startTime = nowData.getTime()
  const month = nowData.getMonth()
  if (month === 11) {
    nowData.setFullYear(nowData.getFullYear() + 1)
    nowData.setMonth(0)
  } else {
    nowData.setMonth(nowData.getMonth() + 1)
  }
  let _endTime = nowData.getTime()
  _endTime = _endTime - 24 * 60 * 60 * 1000
  list.push({
    startTime: _startTime,
    endTime: _endTime,
    startDate: parseDateTime('y-m-d', _startTime),
    endDate: parseDateTime('y-m-d', _endTime)
  })
  if (startTime === endTime) {
    return list
  }
  if (_endTime < endTime) {
    getMonthRangeTime(_endTime + 24 * 60 * 60 * 1000 + 1, endTime, list)
  }
  return list
}
