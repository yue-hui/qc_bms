/*
* 脚本化权限接口
*  */
const fs = require('fs')
const { PERMISSION_DATA } = require('./permissions')
const UUID_FILE_NAME = './data/uuids'

/*
* 生成UUID
* */
function generate_uuid() {
  const uuid = require('node-uuid')
  const creatuuid = uuid.v1()
  return creatuuid.replace(/\-/ig, '')
}

/*
* 扁平化目录结构树
* */
function delayering_page_tree(data_list) {
  const data_row = []

  // 扁平化树型结构
  function recursive(data_list, parent = {}, level = 0) {
    const pcode = parent.code || 0
    const pdir = parent.path || ''
    data_list.map(r => {
      const { name, children } = r
      delete r.children
      const row = r
      row['pcode'] = pcode
      row['path'] = pdir + '/' + name
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

// 输出结果
// const delayering_rows = delayering_page_tree(PERMISSION_DATA)
// console.log('扁平化数据序列: ', delayering_rows)

/*
* 扁平化目录结构树 - 带UUID
* */
function delayering_page_tree_with_uuids(data_list) {
  const uuids_text = fs.readFileSync(UUID_FILE_NAME, 'utf-8')
  // uuid列表
  const uuids = uuids_text ? JSON.parse(uuids_text) : {}
  // 扁平化的数据
  const data_row = []

  // 扁平化树型结构
  function recursive(data_list, parent = {}, level = 0) {
    const pcode = parent.code || 0
    const pdir = parent.path || ''
    data_list.map(r => {
      const { code, children, name } = r
      delete r.children
      const row = r
      row['pcode'] = pcode
      row['path'] = pdir + '/' + name
      row['level'] = level
      if (row['pcode']) {
        row['puuid'] = uuids[row['pcode']]
      } else {
        row['puuid'] = generate_uuid()
        uuids[row['pcode']] = row['puuid']
      }
      if (uuids[code]) {
        row['uuid'] = uuids[code]
      } else {
        row['uuid'] = generate_uuid()
        uuids[code] = row['uuid']
      }
      data_row.push(row)
      if (children.length) {
        recursive(children, r, level + 1)
      }
    })
  }

  recursive(data_list)

  // uuid回写到文件
  const options = {
    // mode: 'w',
    encoding: 'utf-8'
  }
  const uuid_string = JSON.stringify(uuids, null, 2)
  fs.writeFileSync(UUID_FILE_NAME, uuid_string, options)

  return data_row
}

// 输出结果
const delayering_rows_with_uuids = delayering_page_tree_with_uuids(PERMISSION_DATA)
// console.log('扁平化带UUID的数据序列: ', delayering_rows_with_uuids)

/*
* 结构化数据
* */
function sqls_output(rows) {
  const sqls = []
  rows.map(r => {
    const { name, code } = r
    const value_string = [`"${name}"`, code]
    const sql = 'REPLACE INTO t_sys_funcode (`FUNCTION_NAME`, `FUNCTION_NO`) VALUES(' + value_string.join(', ') + ');'
    sqls.push(sql)
  })
  return sqls
}

/* 输出SQL语句*/
// const sqls = sqls_output(delayering_rows)
// console.log(sqls)

/*
* 结构化数据 - 带UUID
* */
function sqls_output_with_uuid(rows) {
  const sqls = []
  rows.map(r => {
    const { uuid, puuid, path, name, code } = r
    const value_string = [`"${uuid}"`, `"${path}"`, `"${name}"`, `"${puuid}"`, code]
    const sql = 'REPLACE INTO t_sys_funcode (`FUNCTION_ID`, `FUNCTION_CODE`, `FUNCTION_NAME`, `PARENT_ID`, `FUNCTION_NO`) VALUES(' + value_string.join(', ') + ');'
    sqls.push(sql)
  })
  return sqls
}

/* 输出SQL语句 - 带UUID*/
// const sqls_with_uuids = sqls_output_with_uuid(delayering_rows_with_uuids)
// console.log(sqls_with_uuids)

/* Page Code的数据检查 */
function page_code_chedked(rows) {
  const result = {
    duplicate_code_status: true  // 检查结果，存在重复的code true 通过 false 不通过
  }
  /* 重复ID检查 */
  const duplicate_code_rows = {}
  rows.map(r => {
    const code = r.code
    if (code in duplicate_code_rows) {
      duplicate_code_rows[code].push(r)
    } else {
      duplicate_code_rows[code] = [r]
    }
  })

  const duplicate_code_gt2_rows = []
  for (const key in duplicate_code_rows) {
    const code_list = duplicate_code_rows[key]
    if (code_list.length > 1) {
      duplicate_code_gt2_rows.push(code_list)
    }
  }
  if (duplicate_code_gt2_rows.length) {
    result.duplicate_code_status = false
    // 重code的页面
    console.info('\n页面存在重复Code值:')
    duplicate_code_gt2_rows.map(code_list => {
      const code = code_list[0]['code']
      const name_list = code_list.map(r => r.name)
      console.warn('\t', code, ' : ', name_list.join(', '))
    })
  }
  return result
}

/* 检查Page Code数据安全性 */
// const result = page_code_chedked(delayering_rows_with_uuids)
// console.log(result)

/*
* 写入SQL脚本
* */
function write_sqls_to_file(rows) {
  console.log('开始生成SQL...')
  const sqls = sqls_output(rows)
  const now_time_string = '-- 生成SQL时间: ' + new String(new Date()) + '\n'
  const sql_string = sqls.join('\n')
  const string = now_time_string + sql_string + '\n\n'
  require('fs').appendFile('./auth_install.sql', string, 'utf-8', function(err, ret) {
    if (err) {
      throw err
    }
    console.log('权限数据库生成成功')
  })
}

/* 写入SQL文件中 */
// write_sqls_to_file(delayering_rows)

/*
* 写入SQL脚本 - 带UUID
* */
function write_sqls_to_file_with_uuid(rows_with_uuid) {
  console.log('开始生成SQL...')
  const sqls = sqls_output_with_uuid(rows_with_uuid)
  const now_time_string = '-- 生成SQL时间: ' + new String(new Date()) + '\n'
  const sql_string = sqls.join('\n')
  const string = now_time_string + sql_string + '\n\n'
  require('fs').appendFile('./auth_install.sql', string, 'utf-8', function(err, ret) {
    if (err) {
      throw err
    }
    console.log('权限数据库生成成功')
  })
}

/* 写入SQL文件中 - 带UUID */
write_sqls_to_file_with_uuid(delayering_rows_with_uuids)

/* 主执行程序 */
function main(with_uuid=true) {
  if (with_uuid) {
    const delayering_rows_with_uuids = delayering_page_tree_with_uuids(PERMISSION_DATA)
    const check_result = page_code_chedked(delayering_rows_with_uuids)
    if (!check_result.duplicate_code_status) {
      console.log('存在重复的数据序列')
    } else {
      write_sqls_to_file_with_uuid(delayering_rows_with_uuids)
    }
  } else {
    const delayering_rows = delayering_page_tree(PERMISSION_DATA)
    const check_result = page_code_chedked(delayering_rows)
    if (!check_result.duplicate_code_status) {
      console.log('存在重复的数据序列')
    } else {
      write_sqls_to_file(delayering_rows)
    }
  }
}

// main()
// 带UUID执行
// main(true)

/* -------------------------------------备用脚本 start--------------------------------- */

/*
* 生成SQL语句
* PAGE TREE MAP SQL - table t_sys_funcode
* */
function analysis_page_structure(auth_list) {
  auth_list.map(r => {
    const { name, code, children } = r
    const value_string = [`"${name}"`, code]
    const sql = 'REPLACE INTO t_sys_funcode (`FUNCTION_NAME`, `FUNCTION_NO`) VALUES(' + value_string.join(', ') + ')'
    // console.log(sql)
    SQL_FLUSH += sql + '\n'
    if (children.length) {
      analysis_page_structure(children)
    }
  })
}

/*
* 生成权限code的SQL语句到文件
* */
function write_sql_to_file(string) {
  require('fs').appendFile('./bms_install.sql', string, 'utf-8', function(err, ret) {
    if (err) {
      throw err
    }
    console.log('页面CODE写入成功')
  })
}

/*
* 生成权限码到文件，并同步到数据库
* */
function sync_auth_code() {
  const GENERAL_TIME_STRING = '生成SQL时间: ' + new String(new Date()) + '\n'
  g = global
  // g = window
  g.SQL_FLUSH = ''
  const auth_string = analysis_page_structure(PERMISSION_DATA)
  write_sql_to_file(GENERAL_TIME_STRING + SQL_FLUSH + '\n')
}

// sync_auth_code()
/* -------------------------------------备用脚本 end--------------------------------- */
