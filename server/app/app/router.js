'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;


  //验证码
  router.get("/verif", controller.user.verif)
  //注册
  router.post('/register', controller.user.register);
};
