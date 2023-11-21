process.on('message',(data)=>{
    console.log('儿子接收到了消息：',data)

})

// 给父亲发送消息
process.send('爸爸您好')
console.log('我是儿子，pid',process.pid)