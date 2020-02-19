var path = require('path')

var config
switch (global.env_config) {
  case 'dev':
    config = {
      baseURL: 'https://msdev.dev.zhixike.net/',
    }
    break
  case 'test':
    config = {
      baseURL: 'https://mstes.dev.zhixike.net/',
    }
    break
  case 'prod':
    config = {
      baseURL: 'https://ms.gwchina.cn/',
    }
    break
  case 'uat':
    config = {
      baseURL: 'https://ms-new.gwchina.cn/',
    }
    break
  case 'pres':
    config = {
      baseURL: 'https://mspres.dev.zhixike.net/',
    }
    break
  default:
    config = {
      baseURL: 'https://ms.gwchina.cn/',
    }
}

config['STATIC_PATH'] = path.join(__dirname, 'static')
config['UPLOAD_DIR_PATH'] = path.join(__dirname, 'uploads')

module.exports = config
