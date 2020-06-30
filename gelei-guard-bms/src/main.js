import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './styles/theme/index.css'
import ElementUI from 'element-ui'
import GlButton from '@/components/GlButton'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'

import '@/icons' // icon
import '@/permission' // permission control
import VCharts from 'v-charts'
import { setVersion } from '@/utils/auth'

// 配置版本号
setVersion()

Vue.use(ElementUI, { zhLocale })
Vue.use(GlButton)
Vue.use(VCharts)

// 全局注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false

console.log('filters: ', filters)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
