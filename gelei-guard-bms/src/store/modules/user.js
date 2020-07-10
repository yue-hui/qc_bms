import { getInfo, login, logout } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { AuthoritySeparate, encrypt_password, get_user_async_routes } from '@/utils/permissions'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    real_name: '',
    account_type: '',
    role_id: '',
    is_agent: '',
    role_name: [],
    btns: [],
    auths: [],
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_REAL_NAME: (state, real_name) => {
      state.real_name = real_name
    },
    SET_ROLE_ID: (state, role_id) => {
      state.role_id = role_id
    },
    SET_ROLE_NAME: (state, role_name) => {
      state.role_name = role_name
    },
    SET_ACCOUNT_TYPE: (state, account_type) => {
      state.is_agent = account_type === '01'
      state.account_type = account_type
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_BTNS: (state, codes) => {
      state.btns = codes
    },
    SET_AUTHS: (state, codes) => {
      state.auths = codes
    }
  },

  actions: {
    // 登录
    Login({ commit }, data) {
      return new Promise((resolve, reject) => {
        const config = {}
        config.account = data.username.trim()
        config.password = encrypt_password(data.password)
        config.code = data.verify
        config.code_uid = data.verify_uid
        login(config).then(response => {
          if (response.status === 0) {
            const app_token = response.data.app_token
            setToken(app_token)
            commit('SET_TOKEN', app_token)
            resolve()
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_NAME', data.user_id)
          commit('SET_AVATAR', data.img_url)
          commit('SET_REAL_NAME', data.real_name)
          commit('SET_ROLE_ID', data.role_id)
          commit('SET_ROLE_NAME', data.role_name)
          commit('SET_ACCOUNT_TYPE', data.account_type)
          const auth = new AuthoritySeparate(data.function_no_list || [])
          const perm = auth.get_perm()
          commit('SET_BTNS', perm)
          const auths = auth.get_auths()
          commit('SET_AUTHS', auths)
          // 处理路由信息
          const routes = get_user_async_routes(auths)
          resolve(routes)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
