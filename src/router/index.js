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
    redirect: '/analysisIndex',
    meta: {
      title: '账号分析',
      icon: 'iconICON_rediansulan'
    },
    children: [
      {
        path: 'analysisIndex',
        component: () => import('@/views/accountAnalysis/index'), // Parent router-view
        name: 'analysisIndex',
        meta: {
          title: '账号总览'
        }
      }, {
        path: 'wechatAnalysis',
        component: () => import('@/views/accountAnalysis/wechatAnalysis'), // Parent router-view
        name: 'wechatAnalysis',
        meta: {
          title: '微信分析'
        }
      }, {
        path: 'microblogAnalysis',
        component: () => import('@/views/accountAnalysis/microblogAnalysis'), // Parent router-view
        name: 'microblogAnalysis',
        meta: {
          title: '微博分析'
        }
      }, {
        path: 'shortVideoAnalysis',
        component: () => import('@/views/accountAnalysis/shortVideoAnalysis'), // Parent router-view
        name: 'shortVideoAnalysis',
        meta: {
          title: '短视频分析'
        }
      }, {
        path: 'traditionalMediaAnalysis',
        component: () => import('@/views/accountAnalysis/traditionalMediaAnalysis'), // Parent router-view
        name: 'traditionalMediaAnalysis',
        meta: {
          title: '传统媒体分析'
        }
      }
    ]
  },
  {
    path: '/comparativeAnalysis',
    component: Layout,
    meta: {
      title: '对比分析',
      icon: 'iconICON_rediansulan'
    },
    children: [
      {
        path: 'wechatComparison',
        component: () => import('@/views/comparativeAnalysis/wechatComparison'), // Parent router-view
        name: 'wechatComparison',
        meta: {
          title: '微信对比'
        }
      }, {
        path: 'microblogComparison',
        component: () => import('@/views/comparativeAnalysis/microblogComparison'), // Parent router-view
        name: 'microblogComparison',
        meta: {
          title: '微博对比'
        }
      }, {
        path: 'shortVideoComparison',
        component: () => import('@/views/comparativeAnalysis/shortVideoComparison'), // Parent router-view
        name: 'shortVideoComparison',
        meta: {
          title: '短视频对比'
        }
      }, {
        path: 'traditionalMediaComparison',
        component: () => import('@/views/comparativeAnalysis/traditionalMediaComparison'), // Parent router-view
        name: 'traditionalMediaComparison',
        meta: {
          title: '传统媒体对比'
        }
      }
    ]
  },
  {
    path: '/accountManagement',
    component: Layout,
    meta: {
      title: '系统设置',
      icon: 'iconICON_rediansulan'
    },
    children: [
      {
        path: 'manageIndex',
        component: () => import('@/views/accountManagement/index'), // Parent router-view
        name: 'manageIndex',
        meta: {
          title: '账号管理'
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
