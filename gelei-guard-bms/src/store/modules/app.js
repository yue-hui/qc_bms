import Cookies from 'js-cookie'
import { constantRoutes } from '@/router'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    drawer: false, // 抽屉是否显示
    msg_reminder_status: false, // 消息通知状态
    routes: [],
    device: 'desktop',
    language: 'zh'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    TOGGLE_GL_DRAWER: (state, status) => {
      if (status) {
        state.drawer = status
      } else {
        state.drawer = !state.drawer
      }
    },
    TOGGLE_GL_MESSAGE_REMINDER_STATUS: (state, status) => {
      state.msg_reminder_status = status
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    ToggleGlDrawer: ({ commit }, { status }) => {
      commit('TOGGLE_GL_DRAWER', status)
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    GenerateAsyncRoute({ commit }, routes) {
      const async_routes = constantRoutes.concat(routes)
      commit('SET_ROUTES', async_routes)
    }
  }
}

export default app
