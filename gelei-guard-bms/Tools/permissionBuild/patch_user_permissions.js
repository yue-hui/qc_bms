/*
* 用户权限接口 - checked
*  */
const { PERMISSION_DATA } = require('./permissions')
// chcp 65001
// console.log(JSON.stringify(PERMISSION_DATA, null, 2))

const page_code = [20001, 20011, 20095, 20027, 20033, 20036, 20043, 20044]

function analysis_page_structure(auth_list) {
  auth_list.map(r => {
    const { name, code, children } = r
    if (page_code.indexOf(+code) !== -1) {
      r.checked = true
      console.log('code: ', code, name)
    } else {
      r.checked = false
    }
    if (children.length) {
      analysis_page_structure(children)
    }
  })
}

analysis_page_structure(PERMISSION_DATA)
// console.log(JSON.stringify(PERMISSION_DATA, null, 2))

function delayering_page_tree(data_list) {
  const data_row = []

  // 扁平化树型结构
  function recursive(data_list, parent = {}, level = 0) {
    const code = parent.code || 0
    data_list.map(r => {
      const { children } = r
      delete r.children
      const row = r
      row['pcode'] = r.code
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
const rows = delayering_page_tree(PERMISSION_DATA)
const true_list = rows.filter(r => r.checked)
const false_list = rows.filter(r => !r.checked)
console.log('总数：', rows.length)
console.log('有权限数：', true_list.length)
console.log('无权限数：', false_list.length)
// 作权限校验检查
console.log('权限校验检查结果：', true_list.length === page_code.length )
