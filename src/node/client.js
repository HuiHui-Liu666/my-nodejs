
const net = require('net')
const types = require('./types')
let nickname = null
const client = net.createConnection({
    host:'127.0.0.1',
    port:3000
})

client.on('connect',()=>{
    console.log('客户端与服务端建立了连接')
    process.stdout.write('请输入昵称：')
    // 接收键盘事件
    process.stdin.on('data',data=>{
        data = data.toString().trim()
        if(!nickname){
            return client.write(JSON.stringify({
                type:types.login,
                nickname:data
            }))
        }
    const matches = /^@(\w+)\s(.+)$/.exec(data)
    //test不会分组 只会测试，exec才会分组
    //@开头  \w+ 多个字符  \s 空格  (.+) 发送的消息。
    // matcher[0]就是字符串本身 1 第一个() 2 就是第二个()
    if(matches){
        // 私聊：
        return client.write(JSON.stringify({
            type:types.p2p,
            to:matches[1],
            message:matches[2]
        }))
    }
        // 登录成功之后 进入正式的聊天：群聊
        client.write(JSON.stringify({
            type:types.broadcast,
            message:data
        }))

        // client.write(data)
    })


})

client.on('data',data=>{
    // 收到服务端的消息之后 通过判断是否登录成功 展示后续内容：
    data = JSON.parse(data.toString().trim())
    switch (data.type) {
        case types.login:
            if(data.success){
                console.log('登录成功当前在线人数：'+data.sumUsers)
                nickname = data.nickname
                process.stdout.write('欢迎进入xxx聊天室：\n')

            }else{
                console.log('登录失败'+data.message)
                process.stdout.write('请重新输入昵称：')
                
            }
            break
        case types.broadcast:
            console.log(`${data.nickname}:${data.message}`)
            break
        case types.p2p:
            if(!data.success){
                return console.log(`发送失败：${data.message}`)
            }
            console.log(`${data.from}:${data.message}`)
            break
        case types.log:
            console.log(data.message)
            break
    }
    
    // console.log(data.toString())
})
