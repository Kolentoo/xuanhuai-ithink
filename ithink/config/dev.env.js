'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // test: 'http://app-dev.hsuanhuai.com/'
  test: 'https://app.hsuansuai.com/'
})