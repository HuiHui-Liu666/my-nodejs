var redis = require('redis')

var client  =redis.createClient();

// 实现分页：
var currentPage = 1;
var listLen = 10;

var start = (currentPage-1)*listLen
var end = currentPage*listLen -1

// postIdArr 是散列。还需要遍历获取具体的文章内容
var postIdArr = client.lRange(`post:list ${start} ${end}`)

postIdArr.forEach(id => {
    client.hGetAll(`post:${id}`,(data)=>{
        console.log(data)
    })
});

// 缺点：如果涉及到文章发布时间的修改，需要修改post：id中的time；还要修改posts：list里面的 比较繁琐
// 当文章较多的时候，访问中间页面的时候 性能较差，因为列表类型是链表实现的  对中间的数据访问消耗性能


// 评论只需字符串进行存储。因为评论的变化不高。
var commentStr = JSON.stringify({
    author:'xxx',
    time:'xxx',
    content:'xxx'
})

client.lPush(`post:${id}:comments ${commentStr}`)