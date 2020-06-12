import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/potential/btn/0', '/potential/btn/1'] // 不重定向白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.btns.length === 0) {
        try {
          const routes = await store.dispatch('GetInfo')
          router.addRoutes(routes)
          await store.dispatch('GenerateAsyncRoute', routes)
          next({ ...to, replace: true })
        } catch (error) {
          store.dispatch('FedLogOut').then(() => {
            Message.error(error || 'Verification failed, please login again')
            next({ path: '/' })
          })
        }
      } else {
        next()
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

router.onError((err) => {
  console.log('onError: ', err)
})
