'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    // 需要权限配置：
    if (ctx.session.login) {
      await ctx.render('home');
    } else {
      ctx.redirect('/login');
    }
  }
}

module.exports = HomeController;
