'use strict';
/**
 * Controller 一般：
 * 获取用户通过http传递过来的请求参数
 * 校验、组装参数
 * 带哦用service 进行业务处理，
 * 通过http奖结果响应给用户
 */
const createRule = {
  title: 'string',
  content: 'string',
};
// * Method | Path | Route Name | Controller.Action
// * -------|-----------------|----------------|-----------------------------
// * GET | /posts | posts | app.controller.posts.index
// * GET | /posts/new | new_post | app.controller.posts.new
// * GET | /posts/:id | post | app.controller.posts.show
// * GET | /posts/:id/edit | edit_post | app.controller.posts.edit
// * POST | /posts | posts | app.controller.posts.create
// * PATCH | /posts/:id | post | app.controller.posts.update
// * DELETE | /posts/:id | post | app.controller.posts.destroy
// const { Controller } = require('egg');
const HttpController = require('./base/http');
class HomeController extends HttpController {
  async index() {
    // get请求：
    const { ctx } = this;
    const res = ctx.service.posts.find({});
    await this.success(res);
  }
  async show() { // 没起作用 url/id
    // get请求： 查询单个文章
    const { ctx } = this;
    try {
      const postsId = ctx.params.id;
      const res = await ctx.service.posts.find({ _id: postsId });
      await this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async update() { // 更新 url/id
    // get请求： 查询单个文章
    const { ctx } = this;
    try {
      const postsId = ctx.params.id;
      const requestBody = ctx.request.body;
      const res = await ctx.service.posts.updateOne({ _id: postsId }, {
        $set: { // 约束：
          ...requestBody,
        },
      });
      await this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async destroy() { // 删除url/id
    const { ctx } = this;
    try {
      const postsId = ctx.params.id;
      const res = await ctx.service.posts.remove({ _id: postsId });
      await this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async create() {
    // 获取参数 写入数据库
    const { ctx } = this;
    try {
      const requestBody = ctx.request.body;
      // 校验参数
      ctx.validate(createRule); // 第二个参数不传 默认 request.body
      // egg框架 自动改成驼峰命名：Posts
      // const postsInstance = new ctx.model.Posts({
      //   title: requestBody.title,
      //   content: requestBody.content,
      // });
      // const res = await postsInstance.save();
      const res = await ctx.service.posts.create(requestBody);
      await this.success(res);
      // 优化：错误处理 返回值 校验参数

    } catch (err) {
      await this.fail(err);
    }


    // console.log('body', requestBody, ctx.csrf);
  }
}

module.exports = HomeController;
