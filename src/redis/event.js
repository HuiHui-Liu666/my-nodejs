var redis = require('redis')

var client  =redis.createClient();

// 关注与被关注



function follow(currentUser,targetUser){ //我 关注 你
    //用集合存储  关注列表
    client.sadd(`user:${currentUser}:guanzhu ${targetUser}`)
    // 在 你的粉丝列表里面添加我
    client.sadd(`user:${targetUser}:fensi ${currentUser}`)
    // 问题：在第一行出现错误之后，后面的也不应该执行---事物 multi 
}




// 通过get/set模拟incr
function incr($key){
    var $value = redis.get($key)
    if(!$key){
        $value=0
    }else{
        $value ++ 
    }
    return $value

}

// 改进：通过get/set模拟incr
function incr1($key){
    client.watch($key) //watch监听
    var $value = redis.get($key)
    if(!$value){
        $value=0
    }else{
        // 进入事务 防止竞态
        client.multi()
        $value ++ 
        client.set(`${$key} ${$value}`)
        client.exec()
    }
    return $value

}

// 为了减轻服务器的压力，每个用户设置一段时间内的最大访问量
// 根据用户id 新建一个字段： rate.limit:$IP  存储访问量。【散列】

// 第一次访问 看下有没有相关字段：
var $ip = 001
var isKeyExists = client.exists(`rate.limit:${$ip}`)
if(isKeyExists){
    // 假设1min最多访问多少次
    var times =  client.incr(`rate.limit:${$ip}`)
    if(times>10){
        client.exit('不能访问 次数太多了！')
    }else{

    }

}else{
    // 问题：执行了下面的第一行代码后 出错 没有设置过期时间：用事务解决
    client.multi()
    client.incr(`rate.limit:${$ip}`)
    client.expire('rate.limit:${$ip} 60')
    client.exec()
}

// 实际中还可以出现，1min的最后一秒访问了9次，第2分钟的第一秒访问了10次，也就是在两秒内访问了了19次。
// 这个最开始的一分钟10次，差距较大。
// 解决：将散列结构改造成数组。：新增加一个当前时间戳，列表长度小于10可以访问，大于10的时候就将第一个时间戳和现在的时间对比。看看是不是在一分钟内
var listLen = client.llen(`rate.limit:${$ip}`)
if(listLen<10){
    // lpush 从左边插入
    client.lpush(`rate.limit:${$ip} ${new Date().valueOf()}`)
}else{
    // 大于10 长度
    var time = client.lindex(`rate.limit:${$ip} -1`) 
    if(new Date.valueOf() - time <60){
        client.exit('不能访问 次数太多了！')
    }else{
    client.lpush(`rate.limit:${$ip} ${new Date().valueOf()}`)
    // 插入新的数据之后  需要吧原来的删除掉
    client.ltrim(`rate.limit:${$ip} 0 9`)
    }
}

// expire 实现缓存 ：两个小时之内 不需要重新计算
// key cache:rank 先获取学生成绩  没有重新计算
// 
var rank = client.get('cache:rank')
if(rank){
    // 有 直接返回
}else{
    var $rank = jisuan()
    client.multi()
    client.set(`cache:rank ${$rank}`)
    client.expire('cache:rank 7200')
    client.exec()
}