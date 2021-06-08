import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  navBarColor: localStorage.getItem('navBarColor') ? localStorage.getItem('navBarColor') : '#e11836',
  siderBarColor: localStorage.getItem('siderBarColor') ? localStorage.getItem('siderBarColor') : 'light',
  predefineColors: [ // 内置主题颜色
    '#e11836', // 活力红
    '#3370fd', // 精锐蓝
    '#6a65e7', // 简约紫
    '#fba800', // 青春黄
    '#27cbb2', // 生态绿
    '#59657f' // 星空灰
  ]
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_theme: (state, theme) => {
    localStorage.setItem('theme', theme)
    state.theme = theme
  },
  TOGGLE_navBarColor(state, val) {
    localStorage.setItem('navBarColor', val)
    state.navBarColor = val
  },
  TOGGLE_siderBarColor(state, val) {
    localStorage.setItem('siderBarColor', val)
    state.siderBarColor = val
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleTheme({ commit }, theme) {
    window.changeIcon
    window.document.documentElement.setAttribute(
      'data-theme', theme
    )
    commit('TOGGLE_theme', theme)
  },
  toggleNavBarColor({ commit }, color) {
    commit('TOGGLE_navBarColor', color)
    window.document.documentElement.setAttribute(
      'style', '--navBarColor:' + color
    )
  },
  toggleSiderBarColor({ commit }, theme) {
    window.document.getElementById('siderBarBox').setAttribute(
      'data-theme', theme
    )
    commit('TOGGLE_siderBarColor', theme)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
