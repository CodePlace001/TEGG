/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.session = {
    key: 'HQYJ',
    maxAge: 1000 * 3600 * 24,
    httpOnly: true,
    encrypt: true
  }


  config.security = {
    csrf: {
      enable: false
    }
  }

  config.multipart = {
    mode: 'file',
  };


  //设置允许哪些源可以跨域访问当前服务器
  // credentials: true  跨域服务的页面去做cookie缓存
  config.cors = {
    origin: 'http://192.168.3.153:8080',
    credentials: true//后端会给去前端返回缓存数据包  告诉浏览器  去做缓存
  }


  //配置mysql参数
  config.mysql = {
    client: {
      //host
      host: "localhost",
      //端口
      port: "3306",
      //用户名
      user: "root",
      //密码
      password: "root",
      //数据库名
      database: "tegg"
    }
  };



  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1600393889117_1199';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
