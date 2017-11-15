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
    title: 'Lithop',
    description: '',
    head: {
      titleTemplate: 'Lithop: %s',
      meta: [
        {charset: 'utf-8'}
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
