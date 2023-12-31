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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1700036142503_8474';

  // add your middleware config here
  config.middleware = [];
  // 模版配置
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };
  // session 配置
  config.session = {
    encrypt: false, // 加密
    signed: false, // 签名
  };
  // redis 配置
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 1,
    },
    agent: true,
  };
  // mongoDB配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/redis-mongo',
    option: {},
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
