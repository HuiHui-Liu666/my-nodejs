const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8000 })

var timeInterval = 5000

ws.on('message',function(msg){
    var msgObj = JSON.parse(msg)
    // 收到消息后 手动改为true
    if(msgObj.type === 'pong' && msgObj.event === 'heartbeat'){
        ws.isAlive = true
        return
    }  
})


const interval = setInterval(function () {
    //  遍历所有客户端 发送一个ping/pong消息
    // 检测是否有返回，如果没有返回 或者超过定时后 主动与客户端的连接断开
    wss.clients.forEach(function each(ws){
        if(ws.isAlive === false){
            console.log('客户端已经断开连接')
            // 连接数需要--
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


// 客户端的罗逻辑：
// 创建连接之时：当客户端连接发生错的时候需要关闭连接，需要监听错误事件

var handler = ''
function checkServer(){
    clearTimeout(handler)
    handler = setTimeout(function(){
        // 主动断开与服务器的连接
    },5000+3000)

}
// 收到服务端消息的时候 
/**
 * 服务器连接的时候也需要调用 checkServer() //调用方法
 *  if(msgObj.type === 'pong' && msgObj.event === 'heartbeat'){
        // 响应：
        checkServer() //调用方法
        xxx.send(JSON.stringify({
            event:'heartbeat',
            message:'pong'
        }))
        return 
    }  
 * 
 * 
 */