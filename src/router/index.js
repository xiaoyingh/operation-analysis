/*
 * @Description: router
 * @Version: 1.0.0
 * @Autor: fc
 * @Date: 2020-11-30 18:38:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-05 14:20:23
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/overView',
    name: 'overView',
    children: [{
      path: 'overView',
      name: 'overView-index',
      component: 'overView/index',
      meta: { title: '分析总览', icon: 'iconICON_rediansulan' }
    }]
  },
  {
    path: '/accountAnalysis',
    component: Layout,
    redirect: '/accountAnalysis/analysisIndex',
    name: 'accountAnalysis',
    children: [
      {
        path: 'analysisIndex',
        component: () => import('@/views/accountAnalysis/index'), // Parent router-view
        name: 'analysisIndex',
        meta: {
          title: '账号分析',
          icon: 'iconICON_rediansulan'
        }
      }
    ]
  },
  {
    path: '/accountManagement',
    component: Layout,
    redirect: '/accountManagement/manageIndex',
    name: 'accountManagement',
    children: [
      {
        path: 'manageIndex',
        component: () => import('@/views/accountManagement/index'), // Parent router-view
        name: 'manageIndex',
        meta: {
          title: '账号管理',
          icon: 'iconICON_rediansulan'
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
