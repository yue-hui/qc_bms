/* 本地存储 */

import { __VERSION__ } from '@/utils/constant'

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
