// @ts-nocheck

/**
 * @description 获取数据类型
 * @param value {*}
 * @return {String}
 * */
 export function getValueType(value){
  return /\[object ([\w\W]+)\]/.exec(({}).toString.call(value))[1].toLowerCase();
}

/**
 * @description 模拟睡眠
 * @param time {Number}
 * */
export function sleep(time = 0){
  return new Promise(resolve => {
    if (time === 0) return resolve();
    setTimeout(() => {
      resolve();
    }, time);
  });
}

/**
 * @description 深拷贝
 * @param val {*}
 * @return {*}
 * */
export function cloneDeep(val){
  return JSON.parse(JSON.stringify(val));
}

/**
 * @description 将时间戳转成可视时间
 * @param timestamp {Number}
 * @param format {String}
 * */
export function parseDateTime(timestamp = null, format = null) {
  !format && (format = 'y-m-d h:i:s');
  !timestamp && (timestamp = null);
  const date = timestamp === null ? new Date() : new Date(Number(timestamp));
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const i = date.getMinutes();
  const s = date.getSeconds();
  return format
    .replace(/y/g, y).replace(/m/g, m < 10 ? '0' + m : m)
    .replace(/d/g, d < 10 ? '0' + d : d).replace(/h/g, h < 10 ? '0' + h : h)
    .replace(/i/g, i < 10 ? '0' + i : i).replace(/s/g, s < 10 ? '0' + s : s);
}

/**
 * @description 将可视时间转换成时间戳
 * @param dateTime {String} 2020-02-02 01:01
 * */
export function parseFormatDate(dateTime){
  const date = dateTime.replace(/[0-9]{2}:[0-9]{2}$/, '').trim();
  const time = dateTime.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/, '').trim();
  const dateArr = date.split('-');
  const timeArr = time.split(':');
  const _date = new Date();
  _date.setFullYear(dateArr[0]);
  _date.setMonth(dateArr[1] - 1);
  _date.setDate(dateArr[2]);
  _date.setHours(timeArr[0]);
  _date.setMinutes(timeArr[1]);
  _date.setSeconds(0);
  _date.setMilliseconds(0);
  return _date.getTime();
}

/**
 * @description 将可视时间转换成时间戳
 * @param dateTime {String} 2020-02-02
 * */
export function parseFormatDate2(dateTime){
  const dateArr = dateTime.split('-');
  const _date = new Date();
  _date.setFullYear(dateArr[0]);
  _date.setMonth(dateArr[1] - 1);
  _date.setDate(dateArr[2]);
  _date.setHours(0);
  _date.setMinutes(0);
  _date.setSeconds(0);
  _date.setMilliseconds(0);
  return _date.getTime();
}
/**
 * @description 判断是否为空
 * @return {Boolean}
 * */
 export function isEmpty(val) {
  return ['', undefined, null].includes(val)
}

/**
 * @description 将秒转成 xx 天 xx 小时 ...
 * @param second {Number} 秒
 * */
export function timeToDuration(second){
  const empty = '无';
  if (getValueType(second) !== 'number' || second <= 0) return empty;
  const days = Math.floor(second / 86400);
  const hours = Math.floor((second % 86400) / 3600);
  const minutes = Math.floor(((second % 86400) % 3600) / 60);
  const seconds = Math.floor(((second % 86400) % 3600) % 60);
  let times = [];
  times.push(days + '天');
  times.push(hours + '小时');
  times.push(minutes + '分');
  times.push(seconds + '秒');
  times = times.filter(item => Number.parseInt(item) !== 0);
  return times.join('');
}

/**
 * @description 剪切字符串
 * @param text {String}
 * @param maxLength {Number}
 * */
export function sliceString(text, maxLength = 3){
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

/**
 * @description 数组去重
 * */
export function arrayUnique(arr){
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

