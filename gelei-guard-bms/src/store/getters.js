const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  language: state => state.app.language,
  permission_routes: state => state.app.routes,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  real_name: state => state.user.real_name,
  role_id: state => state.user.role_id,
  role_name: state => state.user.role_name,
  btns: state => state.user.btns,
  auths: state => state.user.auths,
  roles: state => state.user.roles,
  is_agent: state => state.user.is_agent,
  account_type: state => state.user.account_type
}
export default getters
