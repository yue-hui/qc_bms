/*
* 权限分离
* */
import sha256 from 'sha256'
import { W_CONSTANT } from '@/utils/constant'
import { asyncRoutes, delayLoadRoutes } from '@/router'

export class AuthoritySeparate {
  constructor(codes) {
    const btns = []
    const auths = []
    const pubs = []
    codes.map(r => {
      const _h = parseInt(r / W_CONSTANT)
      // console.log(r, _h)
      switch (_h) {
        case 1:
          btns.push(r)
          break
        case 2:
          auths.push(r)
          break
        case 4:
          pubs.push(r)
          break
        default:
          break
      }
    })
    this.btns = btns
    this.auths = auths
    this.pubs = pubs
  }

  get_perm() {
    return this.btns
  }

  get_auths() {
    return this.auths
  }

  get_common() {
    return this.pubs
  }
}

export function get_page_function_list(auth_list) {
  const function_list = []

  function _analysis_page_structure(list) {
    list.map(r => {
      const { code, children } = r
      function_list.push(code)
      if (children.length) {
        _analysis_page_structure(children)
      }
    })
  }

  _analysis_page_structure(auth_list)
  return function_list
}

export function encrypt_password(password) {
  return sha256(password)
}

// 处理路由信息
export function get_user_async_routes(auths = []) {
  function __get_access_route(routes) {
    const _routes = []
    routes.forEach(route => {
      const { meta, children } = route
      if (children && children.length !== 0) {
        delete route.children
        route['children'] = __get_access_route(children)
      }

      // 修改redirect默认值
      if (route['children'] && route['children'].length > 0) {
        route['redirect'] = route['path'] + '/' + route['children'][0]['path']
      }

      // console.log('sync route: ', children, route, route['children'])
      if (children && children.length > 0 && route && route['children'].length === 0) {
        // 子节点无权限，上级也需要隐藏
      } else {
        if (!meta.pid || (meta.pid && auths.indexOf(meta.pid) !== -1)) {
          _routes.push(route)
        }
      }
    })
    return _routes
  }

  let origin_routes = __get_access_route(asyncRoutes)
  origin_routes = origin_routes.concat(delayLoadRoutes)
  return origin_routes
}
