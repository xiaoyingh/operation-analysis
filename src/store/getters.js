const getters = {
  // app
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  theme: state => state.app.theme,
  navBarColor: state => state.app.navBarColor,
  siderBarColor: state => state.app.siderBarColor,
  predefineColors: state => state.app.predefineColors,
  // user
  userData: state => state.user.userData,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes

}
export default getters
