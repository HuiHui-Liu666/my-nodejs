var redis = require('redis')

var client  =redis.createClient();

// 文章自增id
var $post_id = client.incr('post:count')

var $slug = 'hello-world'
var $title = 'hello world'
var $content = 'xxxxx'
var $views = 0

// 生成文章之前，先校验下 缩略名 是否可用：之后可能会通过缩略名 访问文章
// 关系性数据库 需要新增一张表 存储文章id 与 缩略名直接的映射关系。
// redis里面转门创建一个属性slug.to.id 存这个映射关系，


// 主要搞清楚  这里面的关系。redis能跑之后  运行看看


var isSlug = client.hsetnx(`slug.to.id ${$slug} ${$post_id}`) //缩略名和id一一对应
if(isSlug ===0){
    // 退出
    client.exit('缩略名已存在！')

}else{
    client.hmset(`post:${$post_id} title ${$title} content ${$content} views ${$views}`)
}

// 读取文章：通过缩略名查询id
var postID = client.hGet(`slug.to.id ${$slug}`)
if(!postID){
    client.exit('文章不存在！')
}else{
    var post = client.hGetAll(`post:${postID}`,(err,data)=>{
    })
}

// 修改缩略名：
var newSlug = 'newSlug'

var isSlugExit = client.hsetnx(`slug.to.id ${newSlug} 42`)

if(!isSlugExit){
    client.exit('缩略名已经存在！')
}else{
    var oldSlug = client.hGet(`post:42 slug`) //根本获取不到！！应该是 
    client.hset(`post:42 slug ${newSlug}`)
    client.hDel(`slug.to.id ${oldSlug}`)
}

