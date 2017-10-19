require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const {HOST, PORT, APIHOST, APIPORT} = process.env;
module.exports = Object.assign({
  host: HOST || 'localhost',
  port: PORT,
  rootURL: '/asset',
  apiHost: APIHOST || 'localhost',
  apiPort: APIPORT,
  app: {
    title: 'UHS',
    description: '',
    head: {
      titleTemplate: 'UHS: %s',
      meta: [
        {name: 'description', content: ''},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'UHS'},
        {property: 'og:locale', content: 'zh_CN'},
        {property: 'og:title', content: 'UHS'},
        {property: 'og:description', content: 'Universal Health System.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@lxm'},
        {property: 'og:creator', content: '@lxm'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },
  code: {
    success: 1000, // 成功
    fail: 2000, // 失败
    Unauthorized: 2001, // 该用户无对应权限
    NeedLogin: 2002, // 需要登陆后才能访问
    UnKnowRole: 2003, // 无法识别的角色
    TokenExpired: 2004, // Token已过期
  }
}, environment);
