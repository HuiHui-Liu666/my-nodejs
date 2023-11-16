'use strict';

const { Controller } = require('egg');

class LoginController extends Controller {
  async loginHtml() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    await ctx.render('login');
  }
  async signHtml() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    await ctx.render('sign');
  }
  async sign() {
    // 获取到request 的 body  存储到mongo中
    const { ctx } = this;
    const requestBody = ctx.request.body;
    // 调用方法 存储
    await ctx.model.User.insertMany({
      username: requestBody.username,
      password: requestBody.password,
    });
    ctx.body = '<h1>注册成功了</h1>';
  }
  async login() {
    // 获取request的body 校验 将session和redis进行同步

    const { ctx } = this;
    const requestBody = ctx.request.body;

    // 查询数据库：
    const findUser = await ctx.model.User.find({
      username: requestBody.username,
    });
    // 校验：
    if (findUser.length && findUser[0].password === requestBody.password) {
      // 同步session 和 redis 同步 :只需要一行代码就能搞定
      // 将 egg-session官方实例代码 copy到app.js里面
      // ctx.session //egg原生提供的【给session定义了个属性login 赋值为true】
      // 示例里面的 key ：这个插件会自动生成token ，value 就是 login：true的对象
      ctx.session.login = true;
      console.log(ctx.session, '----');
      ctx.redirect('/');
    } else {
      ctx.redirect('/login');
    }

    // ctx.body = 'hi, egg';
    await ctx.render('login');
  }
  async logout() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    // const {ctx} = this
    ctx.session.login = false;
    ctx.redirect('/login');
  }
}

module.exports = LoginController;
