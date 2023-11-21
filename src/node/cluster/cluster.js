const http = require('http');
const cluster = require('cluster');
const cpuNuns = require('os').cpus().length;

/**
 * cluster模块：
 * 1、属性和方法：isMaster / isWorker /fork()方法。
 * 在cluster.fork()调用的时候，相当于再次执行了node main.js
 * 这就是和process.child不一样的地方。不用重新创建child.js文件
 * 且process.child里面的fork里面可以路径传惨，但是cluster.fork()不传惨
 * 
 * 
 * 2、事件：
 * cluster.on('fork',(data)=>{})
 * 新的工作进程被fork的时候触发，用来记录工作进程活动
 * listening ：如果想看有多少http请求的时候可以用这个
 * message：当cluster主进程接收任意工作进程发送的消息的时候触发
 *      问题：在主进程里面 不知道是哪个工作进程发的消息：【需要在单独的worker上监听】
 * disconnect / exit：只要有工作进程断开了 就会触发
 * 
 * 
 * 
 */

if(cluster.isMaster){
    for(var i=0;i<cpuNuns;i++){
        cluster.fork();
    }
    // message事件：
    // cluster.on('message',(data)=>{
    //     console.log('主进程接收到消息',data)
    // })
    //  问题：在主进程里面 不知道是哪个工作进程发的消息： 需要在单独的worker上监听
    // Object.keys(cluster.workers).forEach((id)=>{
    //     console.log('主进程监听到消息',cluster.workers[id].process.pid)
    // })
    // // 监听工作进程的退出事件：
    // cluster.on('exit',(worker,code,signal)=>{
    //     console.log('工作进程退出',worker.process.pid)
    //     // 重新创建一个工作进程
    //     cluster.fork();
    // })
    cluster.on('disconnect',(data)=>{
        console.log('有工作进程退出了',data.process.pid)
    })

}else{
    // http.createServer((req,res)=>{
    //     res.end('hello')
    // }).listen(8000,()=>{
    //     var a = 'nihe'
    //     console.log('ssss',a)
    //     console.log('server is running 8000')
    // })

    // 向主进程发送消息：
    process.send(process.pid)
}