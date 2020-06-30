/* Vue Filters */
/* Global Register Filters */

/*
* 小数点格式化成百度比
* @param number 带小数点值
* @param digits 默认小数点长度
* */
export function percentageFormat(number, digits) {
  let result
  if (digits === null || digits === undefined) {
    digits = 2
  }
  digits = parseInt(digits)
  if (number === null || number === '' || isNaN(number)) {
    result = '-'
  } else {
    result = Math.round(number * Math.pow(10, digits) * 100) / Math.pow(10, digits) + '%'
  }
  return result
}

/*
* 布尔值格式化
* @param boolean 布尔值参数
* @param trueText 参数bealean为真时显示字符串，默认 Yes
* @param falseText 参数bealean为假时显示字符串，默认 No
* */
export function booleanFormatter(boolean, trueText, falseText) {
  let result
  trueText = trueText || 'Yes'
  falseText = falseText || 'No'
  if (boolean === null || boolean === undefined || boolean === '') {
    result = '-'
  } else {
    result = boolean ? trueText : falseText
  }
  return result
}

/*
* 字节数格式化
* @param size 将字节数字转换成带K/M/G/T单位的字符串
* */
export function byteFormatter(size) {
  let result
  switch (true) {
    case (size === null || size === '' || isNaN(size)):
      result = '-'
      break
    case (size >= 0 && size < 1024):
      result = size + ' B'
      break
    case (size >= 1024 && size < Math.pow(1024, 2)):
      result = Math.round(size / 1024 * 100) / 100 + ' K'
      break
    case (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3)):
      result = Math.round(size / Math.pow(1024, 2) * 100) / 100 + ' M'
      break
    case (size >= Math.pow(1024, 3) && size < Math.pow(1024, 4)):
      result = Math.round(size / Math.pow(1024, 3) * 100) / 100 + ' G'
      break
    default:
      result = Math.round(size / Math.pow(1024, 4) * 100) / 100 + ' T'
  }
  return result
}

/*
* 文字指定长度格式化
* @param words 文字
* @param length 截取文字长度
* */
export function beautifyWordsFormatter(words, length) {
  let result
  if (words) {
    if (words.length > length) {
      result = words.slice(0, length) + '...'
    } else {
      result = words
    }
  } else {
    result = ''
  }
  return result
}
