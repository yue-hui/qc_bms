/* 本地存储 */

import { __VERSION__, DEFAULT_PAGE_SIZE, PagenationSizeKey } from '@/utils/constant'

const TokenKey = 'APP-Token'

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
  const pagenation_page_size = localStorage.getItem(PagenationSizeKey) || DEFAULT_PAGE_SIZE
  return +pagenation_page_size
}
