/* 本地存储 */
import Cookies from 'js-cookie'
import { __VERSION__, DEFAULT_PAGE_SIZE, PagenationSizeKey } from '@/utils/constant'

const TokenKey = 'APP-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  localStorage.removeItem(TokenKey) // 迭代若干版本后移除此行
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
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
