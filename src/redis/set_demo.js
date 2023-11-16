var redis = require('redis')

var client  =new redis({})

// 存储文章标签 post:id:tags 
client.sadd('post:42:tags 杂文 科技 java')
client.srem('post:42:tags 杂文')

// 获取所有的：
var tags = client.smembers('post:42:tags')

// 通过tag 查询文章？
// 存储文章对应的tags  + 存储某一类tags下 有哪些文章id


