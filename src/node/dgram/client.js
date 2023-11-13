const dgram = require('dgram')

const client = dgram.createSocket('udp4')
// client.send('hello',3000,'localhost')
client.on('listening',()=>{
    client.addMembership('224.0.1.100')
    const address = client.address()
        console.log(`server running ${address.address}:${address.port}`)
})

client.on('message',(msg,remoteInfo)=>{
    console.log(`server got ${msg} from${remoteInfo.address}:${remoteInfo.port}`)
})

client.on('error',(err)=>{
    console.log('server err',err)
})

// 可以不写，默认自动绑定端口号 然后可以直接通过send发送消息
client.bind(8000)