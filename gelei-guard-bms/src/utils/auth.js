/* 本地存储 */

import { __VERSION__, DEFAULT_PAGE_SIZE, PagenationSizeKey } from '@/utils/constant'

const TokenKey = 'APP-Token'
const ButtonPermissionKey = '_btn'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

const VersionKey = 'ver'

export function setVersion() {
  return localStorage.setItem(VersionKey, __VERSION__)
}

export function setPagenationSize(size) {
  return localStorage.setItem(PagenationSizeKey, size)
}

export function getPagenationSize() {
  const local_size = localStorage.getItem(PagenationSizeKey)
  const pagenation_page_size = local_size || DEFAULT_PAGE_SIZE
  return +pagenation_page_size
}
