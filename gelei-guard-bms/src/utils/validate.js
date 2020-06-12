/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证密码规则 */
export function validatePassword(str) {
  const reg1 = /[!@#$%^&*()_?<>{}]{1}/
  const reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,15}/
  const reg3 = /[a-zA-Z]+/
  const reg4 = /[0-9]+/
  if (reg1.test(str) && reg2.test(str) && reg3.test(str) && reg4.test(str)) {
    return { status: true, message: '校验通过' }
  } else if (!reg1.test(str)) {
    return { status: false, message: '需包含一个特殊字符' }
  } else if (!reg2.test(str)) {
    return { status: false, message: '长度在6-15位' }
  } else if (!reg3.test(str)) {
    return { status: false, message: '需含有字母' }
  } else if (!reg4.test(str)) {
    return { status: false, message: '需含有数字' }
  }
}

/* 简单验证密码 */
export function validatePasswordSimple(str) {
  const reg = /^([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,15}$/
  if (reg.test(str)) {
    return { status: true, message: '校验通过' }
  } else {
    return { status: false, message: '密码长度范围为6-15位' }
  }
}

export function validateChinese(str) {
  // \u4e00-\u9fa5 是中文字符的unicode编码
  var regExp = /^[\u4e00-\u9fa5]+$/
  if (regExp.test(str)) {
    return { status: true, message: '检验中文字符成功' }
  } else {
    return { status: false, message: '不包含中文字符' }
  }
}

