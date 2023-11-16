'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.login.loginHtml);
  router.get('/sign', controller.login.signHtml);
  router.get('/logout', controller.login.logout);
  // 注册api 接口
  router.post('/api/login', controller.login.login);
  router.post('/api/sign', controller.login.sign);

};
