import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userData: '', // 用户信息
    userName: 'JSSONG', // 用户名称
    userId: '', // 用户Id
    tenantId: '' // 租户Id
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER: (state, data) => {
    state.userData = data
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_DATA: (state, data) => {
    state.userData = data
    state.userName = data.userName
    state.userId = data.userId
    state.tenantId = data.tenantId
  },
  SET_USER_NAME: (state, name) => {
    state.userName = name
  },
  SET_USER_ID: (state, token) => {
    state.userId = token
  },
  SET_TENANT_ID: (state, id) => {
    state.tenantId = id
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 不接sso
      // const data = {
      //   useId: 555
      // }
      // commit('SET_USER', data)
      // resolve(data)
      // 接sso
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject(response)
        } else {
          commit('SET_USER_DATA', data[0])
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
