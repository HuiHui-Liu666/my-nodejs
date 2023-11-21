const Service = require('egg').Service;

class PostsService extends Service {
  // 操作数据库的逻辑：增删改查：
  async create(data) {
    const postsInstance = new this.ctx.model.Posts({
      title: data.title,
      content: data.content,
    });
    const res = await postsInstance.save();
    return res;
  }
  async find(data) {
    const res = await this.ctx.model.Posts.find(data);
    return res;
  }
  async remove(data) {
    const res = await this.ctx.model.Posts.remove(data);
    return res;
  }
  async updateOne(findDate, data) {
    const res = await this.ctx.model.Posts.updateOne(findDate, data);
    return res;
  }
}

module.exports = PostsService;
