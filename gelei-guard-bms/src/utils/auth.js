/* 本地存储 */

import { __VERSION__, DEFAULT_PAGE_SIZE, PagenationSizeKey } from '@/utils/constant'
import { Decrypt, Encrypt } from '@/utils/secret'

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
  const enc_size = Encrypt(size)
  return localStorage.setItem(PagenationSizeKey, enc_size)
}

export function getPagenationSize() {
  const local_size = localStorage.getItem(PagenationSizeKey)
  let dec_size
  if (local_size) {
    dec_size = Decrypt(local_size)
  } else {
    dec_size = ''
  }
  const pagenation_page_size = dec_size || DEFAULT_PAGE_SIZE
  return +pagenation_page_size
}

export function setButtonPermission(status) {
  if (status === '1') {
    return localStorage.setItem(ButtonPermissionKey, true)
  } else {
    localStorage.removeItem(ButtonPermissionKey)
  }
}

export function getButtonPermission() {
  return localStorage.getItem(ButtonPermissionKey)
}
