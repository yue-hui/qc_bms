'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IS_SIGN: true,
  TRANSFER_REQ: '"https://msdev.dev.zhixike.net/greenguard"',
  BASE_API: '"/gelei-guard-bms/api"',
  GNW_APPID: '"437EC0AC7F0000015E2BBF4849643C96"',
  GNW_TOKEN: '"27688ab70a56db714b59a6ebc79b8509a1f81629ce8edc743e1bc23e24465735"',
  GNW_APP_TOKEN: '"eyJhbGciOiJIUzI1NiJ9.eyJBUFBfVE9LRU46IjoiMTU5NTkyNzY2ODZfeUJGNVFoIiwiZXhwIjoxNTQ3MTkzMTE5fQ.NkiDvuo2lLWRm-4J2PTr8y5bpjmWrhyPUT0VQs-Y0b4"',
  GNW_VERSION: '"1.0.0"',
  GNW_SOURCE: '"05"'
})
