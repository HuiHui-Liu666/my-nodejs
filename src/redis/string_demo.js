var redis = require('redis')

var client  =redis.createClient();

var $post_id = client.incr('post:count')

// 以字符串类型存储文章：标题 内容 阅读量
var $article = JSON.stringify({
    title:'hello',
    content:'xxxx',
    view:0
})

// client.set(`post:${$post_id}:data ${$article}`)

// var article = JSON.parse(client.get(`post:1:data`))
// console.log(article)


// // 递增 id 
// var $post_id = client.incr('post:count')
