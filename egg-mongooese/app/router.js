'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.post('/add', controller.home.create);

  // 增删改茶：
  router.resources('posts', '/api/posts', controller.home);

};
