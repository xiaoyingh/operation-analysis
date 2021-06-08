import { constantRoutes } from '@/router'
/* Layout */
import Layout from '@/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function filterAsyncRoutesLayout(routes) {
  const res = []
  routes.forEach(route => {
    if (route.component === 'Layout') {
      route.component = Layout
    } else if (route.component !== '' && typeof (route.component) === 'string') {
      route.component = _import(route.component)
    }
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRoutesLayout(tmp.children)
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      roles = filterAsyncRoutesLayout(roles)
      roles.push({ path: '*', redirect: '/404', hidden: true })
      const accessedRoutes = roles
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
