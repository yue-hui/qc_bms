var path = require('path')

var config
switch (global.env_config) {
  case 'dev':
    config = {
      baseURL: 'https://msdev.dev.zhixike.net/greenguard',
      baseObjURL: 'https://msdev.dev.zhixike.net/file'
    }
    break
  case 'test':
    config = {
      baseURL: 'https://mstes.dev.zhixike.net/greenguard',
      baseObjURL: 'https://mstes.dev.zhixike.net/file'
    }
    break
  case 'prod':
    config = {
      baseURL: 'https://ms.gwchina.cn/greenguard',
      baseObjURL: 'https://ms.gwchina.cn/file'
    }
    break
  default:
    config = {
      baseURL: 'https://ms.gwchina.cn/greenguard',
      baseObjURL: 'https://ms.gwchina.cn/file'
    }
}

config['STATIC_PATH'] = path.join(__dirname, 'static')
config['UPLOAD_DIR_PATH'] = path.join(__dirname, 'uploads')

module.exports = config
