const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8000 })
var group = {} //充当一个计数器
var timeInterval = 5000
wss.on('connection', function(ws) {
    console.log('a new client id connected')
    ws.isAlive = true //初始化客户端的连接状态
    ws.on('message', function(message) {
        // x需要广播到 其他客户端：
        var ob = JSON.parse(message.toString())
        if(ob.event==='heartbeat' && ob.message ==='pong'){
            ws.isAlive = true
            return
        }
        var message = message.toString()
        if(ob.name){
            ws.name = ob.name
        }
        if(ob.roomid && typeof ws.roomid === 'undefined'){
            ws.roomid = ob.roomid
            // 充当计数器
            if(typeof group[ws.roomid] === 'undefined'){
                group[ws.roomid] = 1
            }else{
                group[ws.roomid]++
            }
        }
        ob.num = wss.clients.size
        wss.clients.forEach(function each(client){
            // 广播给非自己的客户端
            // if(client.readyState===WebSocket.OPEN){
            //     console.log('send message to client',message,ob)
            //     client.send(JSON.stringify(ob))
            // }
            ob.num = group[ws.roomid]
            console.log('xxx:',client.readyState===WebSocket.OPEN && client.roomid ===ws.roomid)
            if(client.readyState===WebSocket.OPEN && client.roomid ===ws.roomid){
                client.send(JSON.stringify(ob))
            }
        })
    })
    ws.on('close',function(){
      console.log('on client is closed')  
      // 广播下 谁退出了：
      if(typeof ws.name !== 'undefined'){
        group[ws.roomid] = group[ws.roomid] - 1
          wss.clients.forEach(function each(client){
            // 广播给非自己的客户端
            if(client !==ws && ws.roomid === client.roomid && client.readyState===WebSocket.OPEN){
                client.send(JSON.stringify({
                    name:ws.name,
                    event:'logout',
                    num:group[ws.roomid]
                }))
            }
        })
      }
    })
})


const interval = setInterval(function () {
    //  遍历所有客户端 发送一个ping/pong消息
    // 检测是否有返回，如果没有返回 或者超过定时后 主动与客户端的连接断开
    wss.clients.forEach(function each(ws){
        if(ws.isAlive === false){
            console.log('客户端已经断开连接')
            // 连接数需要--
            group[ws.roomid] = group[ws.roomid] - 1
            return ws.terminate()
        }
        ws.isAlive = false
        //  发送一个ping/pong消息 
        // 客户端返回了之后 主动设置isAlive的状态
        ws.send(JSON.stringify({
            event:'heartbeat',
            message:'ping'
        }))
    })
    // 问题：客户端 断开之后 wss.clients 为0  不会执行forEach里的逻辑
},timeInterval)
