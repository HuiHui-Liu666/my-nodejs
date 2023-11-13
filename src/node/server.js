const net = require('net')
const types = require('./types')

const server = net.createServer()

// socket数组
const users = []
server.on('connection',clientSocket=>{
    // 把当前连接的客户端通信接口存储到数组中
    // clients.push(clientSocket)
    clientSocket.on('data',data=>{
        data = JSON.parse(data.toString().trim())
        // 消息🈶三种类型：
        switch (data.type){
            case types.login:
                if(users.find(item=>item.nickname === data.nickname)){
                    return clientSocket.write(JSON.stringify({
                        type:types.login,
                        success:false,
                        message:'昵称已存在！'
                    }))
                }
                clientSocket.nickname = data.nickname
                users.push(clientSocket)
                clientSocket.write(JSON.stringify({
                    type:types.login,
                    success:true,
                    message:'登录成功！',
                    nickname:clientSocket.nickname,
                    sumUsers:users.length
                }))
                // 广播下 有人上线了：
                users.forEach(item=>{
                    if(item.nickname !== clientSocket.nickname){
                        item.write(JSON.stringify({
                            type:types.log,
                            message:`${data.nickname}进入了聊天室，当前在线用户 ${users.length}`
                        }))
                    }
                })
                break
            case types.broadcast:
                // 群聊 需要发送给所有的客户端：
                users.forEach(item=>{
                    if(item.nickname !== clientSocket.nickname){
                        item.write(JSON.stringify({
                            type:types.broadcast,
                            nickname:clientSocket.nickname,
                            message:data.message
                        }))
                    }
                })
                break
            case types.p2p:
                const user = users.find(item=>item.nickname === data.to)
                if(!user){
                    return clientSocket.write(JSON.stringify({
                        type:types.p2p,
                        success:false,
                        message:"该用户不存在"
                    }))
                }
                user.write(JSON.stringify({
                    type:types.p2p,
                    from:clientSocket.nickname,
                    success:true,
                    message:data.message
                }))
                break
            default:
                break
        }

    })

    // 监听离开事件：
    clientSocket.on('end',()=>{
        console.log('有用户离开了')
        const index =  users.findIndex(item=>item.nickname === clientSocket.nickname)
        const offUser = users[index]
        
        users.forEach(item=>{
            item.write(JSON.stringify({
                type:types.log,
                message:`${offUser.nickname}离开了聊天室`
            }))
        })
        users.splice(index,1) // splice ：从index开始 删除1个

    })
})

server.listen(3000,()=>{console.log('server is listening !')})