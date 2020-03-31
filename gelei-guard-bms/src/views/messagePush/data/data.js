
export function messagePush_status(value) {
  switch (value) {
    case '1': return '已发送'
    case '0': return '未发送'
  }
}
export function messagePush_terrace(value) {
  switch (value) {
    case '01': return '格雷守护'
    case '02': return '格雷盒子'
    case '03': return '智习客'
    case '04': return '格雷优选'
  }
}
