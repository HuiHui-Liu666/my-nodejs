// posts 存储的表
module.exports = app => {
  const mongoose = app.mongoose; // 因为之前在plugin.js里面引入 egg-mongoose 所以 就挂载到了app身上
  // 1、创建schema(设置字段):title / content
  const schema = mongoose.Schema({ title: {
    type: String,
    unique: true,
  }, content: String });
  // 2、将schema编译成一个model类：并暴露出去:
  //   暴露出去之后，在ctx.model.posts的身上就能访问到model类
  // 之后的增删改查 都是在model类上。
  return mongoose.model('posts', schema);
};
