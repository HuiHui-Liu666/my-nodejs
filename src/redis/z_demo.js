var redis = require('redis')

var client  =new redis({})

// 实现分页：
var currentPage = 1;
var listLen = 10;

var start = (currentPage-1)*listLen
var end = currentPage*listLen -1

// 实现点击量：post:page.view

// 降序：
var postID = client.zrecrange(`post:page.view ${start} ${end}`)

// 接下来就是去集合里面把值取出来，因为此时存储的是点击量，需要根据查询的id取值
postID.forEach(id => {
    client.hgetall(`post:${id}`,(data)=>{
        console.log(data) //标题 内容等等
    })
}); 