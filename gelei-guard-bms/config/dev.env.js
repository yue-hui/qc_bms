'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IS_SIGN: true,
  // BASE_API: '"http://172.168.50.58:12710"',
  BASE_API: '"https://msdev.dev.zhixike.net/greenguard"',
  // BASE_API: '"http://localhost:9528/api"',
  GNW_APPID: '"437EC0AC7F0000015E2BBF4849643C96"',
  GNW_TOKEN: '"27688ab70a56db714b59a6ebc79b8509a1f81629ce8edc743e1bc23e24465735"',
  GNW_VERSION: '"1.0.0"',
  GNW_SOURCE: '"05"'
})
