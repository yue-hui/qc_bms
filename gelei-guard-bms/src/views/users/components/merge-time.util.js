const versionDiff = require('version-diff')
import {cloneDeep}  from "./utilt";

function clear(date) {
  date.setDate(new Date().getDate())
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}
function parseDateTime(timestamp = null, format = null) {
  !format && (format = 'y-m-d h:i:s')
  !timestamp && (timestamp = null)
  const date = timestamp === null ? new Date() : new Date(Number(timestamp))
  const y = date.getFullYear(); const m = date.getMonth() + 1
  const d = date.getDate(); const h = date.getHours()
  const i = date.getMinutes(); const s = date.getSeconds()
  return format
    .replace(/y/g, y).replace(/m/g, m < 10 ? '0' + m : m)
    .replace(/d/g, d < 10 ? '0' + d : d).replace(/h/g, h < 10 ? '0' + h : h)
    .replace(/i/g, i < 10 ? '0' + i : i).replace(/s/g, s < 10 ? '0' + s : s)
}
function isDateIntersection([start1, end1], [start2, end2]) {
  if (start1 >= start2 && start1 <= end2) {
    return true
  }
  if (end1 >= start2 && end1 <= end2) {
    return true
  }
  return start1 <= start2 && end1 >= end2
}
/**
 * @description 判断是否是下一天的零时
 * */
function isNextDay(timestamp) {
  let date = new Date()
  date = clear(date)
  return timestamp === date.getTime() + 60 * 60 * 24 * 1000
}
function mergeTime(timeA, timeB) {
  timeA = timeA.split('-')
  timeB = timeB.split('-')
  let date = new Date()
  // 清空时分秒
  date = clear(date)
  date.setHours(timeA[0].split(':')[0])
  date.setMinutes(timeA[0].split(':')[1])
  //
  let t1 = date.getTime()
  date = clear(date)
  date.setHours(timeA[1].split(':')[0])
  date.setMinutes(timeA[1].split(':')[1])
  //
  let t2 = date.getTime()
  date = clear(date)
  date.setHours(timeB[0].split(':')[0])
  date.setMinutes(timeB[0].split(':')[1])
  //
  let t3 = date.getTime()
  date = clear(date)
  date.setHours(timeB[1].split(':')[0])
  date.setMinutes(timeB[1].split(':')[1])
  //
  let t4 = date.getTime()
  // 当时间为24:00时为下一天 减去一毫秒 在最终显示时手动替换23:59即可
  t1 = isNextDay(t1) ? (t1 - 1) : t1
  t2 = isNextDay(t2) ? (t2 - 1) : t2
  t3 = isNextDay(t3) ? (t3 - 1) : t3
  t4 = isNextDay(t4) ? (t4 - 1) : t4
  const newTime = [t1, t2, t3, t4]

  // 判断是否存在交集
  if (isDateIntersection([newTime[0], newTime[1]], [newTime[2], newTime[3]])) {
    // 只返回比较后的时间
    return [[Math.min.apply(null, newTime), Math.max.apply(null, newTime)]]
  }
  // 返回原始时间
  return [[t1, t2], [t3, t4]]
}

function mergeTimeString(timeA, timeB) {
  let merge = mergeTime(timeA, timeB)
  merge = merge.map(item => {
    let timeString = ''
    const startTime = new Date(item[0])
    const endTime = new Date(item[1])
    timeString = parseDateTime(startTime, 'h:i')
    timeString = timeString + '-' + parseDateTime(endTime, 'h:i')
    return timeString
  })
  return merge
}
/**
 * @description 将时间数组进行从小到大排序
 * @example timeStringSort(['10:00-11:00','08:00-09:00']) => ['08:00-09:00','10:00-11:00']
 * */
function timeStringSort(times) {
  return times.sort((a, b) => {
    return versionDiff.main(a.split('-')[0].replace(/:/g, '.'), b.split('-')[0].replace(/:/g, '.')) === '>' ? 1 : -1
  })
}
/**
 * @description
 * */
 function mergeTimeRangeString(timeA, timeC) {
  if (timeC.length === 0) {
    return [timeA]
  }
  let endTime = []
  // timeA = '07:31-10:09'
  timeC = timeStringSort(cloneDeep(timeC))
  timeC.forEach((item, index) => {
    const merge = mergeTimeString(timeA, item)
    if (merge.length === 1) {
      timeA = merge[0]
      if (index + 1 === timeC.length) {
        endTime.push(merge[0])
      }
    } else {
      endTime.push(merge[1])
      if (index + 1 === timeC.length) {
        endTime.push(merge[0])
      }
    }
  })
  endTime = timeStringSort(endTime)
  endTime = Array.from(new Set([...endTime]))
  return endTime.filter(item => {
    // 去除 ['10:00-10:00']
    return item.split('-')[0] !== item.split('-')[1]
  }).map(item => {
    item = item.replace(/23:59/g, '24:00')
    return item
  })
}
export default {
  mergeTimeRangeString
}