const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('listening',()=>{
    // 开启 广播 模式
    // server.setBroadcast(true)
    // 每隔两秒 发送一条广播消息：
    setInterval(function(){
        // 受限地址：全是1 
        // server.send('受限地址',8000,'255.255.255.255')
        server.send('受限地址',8000,'224.0.1.100')
    },2000)
    const address = server.address()
        console.log(`server running ${address.address}:${address.port}`)
})

server.on('message',(msg,remoteInfo)=>{
    console.log(`server got ${msg} from${remoteInfo.address}:${remoteInfo.port}`)
})

server.on('error',(err)=>{
    console.log('server err',err)
})

server.bind(3000)


/**
 * 广播：在单播的基础上：
server.setBroadcast(true) 开始广播：
server.send('受限地址',8000,'255.255.255.255’) 受限地址 发送消息。此时 同一个局域网。全部都能收到该条消息。
直接地址：可以跨网段传输。最后一位是255. 会被路由转发 

组播实现：
在服务端 直接将发送消息的ip地址改为：224.0.1.100 
在客户端 在listening之后，调用 client.addMembership(‘224.0.1.100’) 加入指定的组播组。 
 * 
 */