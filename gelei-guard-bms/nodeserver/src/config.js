var config
switch (global.env_config) {
  case 'dev':
    config = {
      baseURL: 'https://msdev.dev.zhixike.net/greenguard'
    }
    break
  case 'test':
    config = {
      baseURL: 'https://mstes.dev.zhixike.net/greenguard'
    }
    break
  case 'prod':
    config = {
      baseURL: 'https://ms.gwchina.cn/greenguard'
    }
    break
  default:
    config = {
      baseURL: 'https://ms.gwchina.cn/greenguard'
    }
}
module.exports = config
