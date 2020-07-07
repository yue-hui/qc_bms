/*
* 脚本化权限接口
*  */
const { PERMISSION_DATA } = require('./permissions')

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
