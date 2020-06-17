/* 本地存储 */

import { __VERSION__, DEFAULT_PAGE_SIZE, PagenationSizeKey } from '@/utils/constant'

const TokenKey = 'APP-Token'
const ButtonPermissionKey = '_btn'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
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

export function setButtonPermission(status) {
  localStorage.removeItem('page_sizes') // 20200617
  if (status === '1') {
    return localStorage.setItem(ButtonPermissionKey, true)
  } else {
    localStorage.removeItem(ButtonPermissionKey)
  }
}

export function getButtonPermission() {
  return localStorage.getItem(ButtonPermissionKey)
}
