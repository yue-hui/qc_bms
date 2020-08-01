/*
* 区分页面code与接口code
* */
const { PERMISSION_DATA } = require('./permissions')
const { PAGE_MAPPER } = require('./page_map')

/*
* 扁平化目录结构树
* */
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
// console.log('rows: ', rows)
const permission_code_list = rows.filter(r => r.checked).map(r => r.code)
console.log('页面权限列表: ', permission_code_list)
const page_map_permission_list = new Set()
permission_code_list.map(r => {
  const page_permission = PAGE_MAPPER[r]
  page_map_permission_list
  page_permission.map(c => {
    page_map_permission_list.add(c)
  })
})
const interface_list = Array.from(page_map_permission_list)
console.log('接口权限列表：', interface_list)
