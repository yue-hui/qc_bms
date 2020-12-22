var path = require('path')

var config
switch (global.env_config) {
  case 'dev':
    config = {
      baseURL: 'https://ms-dev.qcg.cc:9999/'
    }
    break
  case 'test':
    config = {
      baseURL: 'https://ms-test1.qcg.cc:9999/'
    }
    break
  case 'test2':
    config = {
      baseURL: 'https://ms-test2.qcg.cc:9999/'
    }
    break
  case 'beta1':
    config = {
      baseURL: 'https://ms-beta.qcg.cc/'
    }
    break
  case 'prod1':
    config = {
      baseURL: 'https://ms.qcg.cc/'
    }
    break
}

config['STATIC_PATH'] = path.join(__dirname, 'static')
config['UPLOAD_DIR_PATH'] = path.join(__dirname, 'uploads')

module.exports = config
