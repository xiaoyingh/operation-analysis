import router from './router'
import { asyncRoutes } from '@/router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log(store.getters)
      const hasGetUserInfo = store.getters.userName
      if (hasGetUserInfo) {
        console.log('hasGetUserInfo')
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    let userData = store.getters.userData
    if (userData === '') {
      await store.dispatch('user/getInfo')
      userData = store.getters.userData
      // const permList = userData.permList
      const permList = asyncRoutes
      const accessRoutes = await store.dispatch('permission/generateRoutes', permList)
      router.addRoutes(accessRoutes)
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
