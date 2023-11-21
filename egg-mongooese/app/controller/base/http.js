const { Controller } = require('egg');

class HttpController extends Controller {

  async success(data) {
    // msg code两个字段 在锁哦呦的请求里都需要返回
    this.ctx.body = {
      msg: data && data.msg || 'ok',
      code: 0,
      data,

    };
  }

  async fail(data) {
    this.logger.error(data);
    this.ctx.body = {
      msg: data && data.msg || 'fail',
      code: data && data.code || -1,
      // error: data, // 可以兼容字符串和对象
      data, // nodejs底层的错误信息不会 显示 防止其他人猜到代码
    };
  }
}
module.exports = HttpController;

