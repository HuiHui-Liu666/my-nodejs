var fs = require('fs')
var path = require('path')

// function somAsyncOperation(callback){
//     // 花费2ms
//     fs.readFile(path.resolve(__dirname,'/read.text',callback))

// }

// var timeoutScheduled = Date.now()
// var fileReadTime = 0

// setTimeout(function(){
//     var delay = Date.now() - timeoutScheduled
//     console.log('delay:',delay)
//     console.log('fileReadTime:',fileReadTime-timeoutScheduled)
// },10)

// somAsyncOperation(function(err,data){
//     fileReadTime = Date.now()
//     while(Date.now()-fileReadTime<20){

//     }
// })

// function a(){console.log('aaa')}
// function b(){
//     while(true){}
//     a()
// }
// b()


// @@@@@@@@@@@@@@@@@@@@@@@   node 事件循环：例子1 
// console.log('脚本开始')
// setTimeout(() => {
// console.log('定时器')
    
// }, 10);
// console.log('脚本结束')
/**
 * 流程分析：
 * 整段作为task任务，放入执行栈；同步的‘脚本开始’，入栈执行出栈；异步的定时器任务 进入 【异步模块】等待被处理；
 * 同步的‘脚本结束’，入栈执行出栈；接着 task任务出战。执行栈清空了，查看任务队列里面有没有东西。
 * 
 * 注意：任务队列根据 异步操作的分类 也分为了三类：timer poll check
 * 查看任务队列里面有没有东西：1首先是timer队列，因为定时器还在执行中，所以此时为空
 * 2查看poll队列：poll也是空，但是此时的事件循环不会继续执行，会进行判断：看timer和check有没有需要执行的回调
 * 如果有：继续循环执行回调；如果没有：会在这里暂停下来。等poll队列出现新的io事件。
 * 在poll队列等待的原因：进入任务队列的事件会被立刻处理。更快响应客户端的请求。
 * 从设计上：事件循环 是希望优先处理io事件的。
 * 
 * 
 * 继续分析：10ms到了之后，回调函数会进入timer队列，此时调用栈空闲，事件循环将回调加入调用栈中 执行。
 */

// @@@@@@@@@@@@@@@@@@@@@@@   node 事件循环：例子2 加入文件读取
// console.log('脚本开始')
// setTimeout(() => {
// console.log('定时器')
    
// }, 10);
// // IO操作 读取文档 耗时20ms
// fs.readFile(path.resolve(__dirname,'/read.text',(err,data)=>{
//     console.log('文件读取完成')
// }))
// console.log('脚本结束')
/**
 * 流程分析：同步任务还是一样的；定时器进入异步模块；io操作进入异步模块，所有的同步代码执行完毕
 * 执行栈清空，进入事件循环：此时所有的列队都为空，在poll处等待
 * 10ms后 定时器回调推入timer，事件循环重新启动，将回调推入调用栈，执行 出战。
 * 然后事件循环继续回到poll处等待
 * 再过10ms之后，io操作回调放入poll，事件循环重新启动，将回调推入调用栈，执行 出战。
 * 
 */
// @@@@@@@@@@@@@@@@@@@@@@@   node 事件循环：例子3 加入文件读取 加入setImmediate事件
// console.log('脚本开始')

// setTimeout(() => {
// console.log('定时器')
    
// }, 10);
// // IO操作 读取文档 耗时20ms
// setTimeout(() => {
//     // console.log('定时器')
//     fs.readFile('/read.txt',(err,data)=>{
//         console.log('文件读取完成')
//     }) 
//     }, 20);
// // fs.readFile('/read.txt',(err,data)=>{
// //     console.log('文件读取完成')
// // })
// setImmediate(()=>{
//     console.log('setImmediate')
// })
// console.log('脚本结束')
/**
 * 流程分析：同步任务还是一样的；定时器进入异步模块；io操作进入异步模块，所有的同步代码执行完毕
 * 执行栈清空，进入事件循环：此时所有的列队都为空，在poll处等待
 * 10ms后 定时器回调推入timer，事件循环重新启动，将回调推入调用栈，执行 出战。
 * 然后事件循环继续回到poll处等待
 * 再过10ms之后，io操作回调放入poll，事件循环重新启动，将回调推入调用栈，执行 出战。
 *   
 */



//  process.nextTick不在事件循环的任何阶段执行，而是个各个阶段切换的时候执行：如何poll-》check-〉timer 

fs.readFile('/read.txt',(err,data)=>{
    setTimeout(()=>{
        console.log('setTimeout')
    },0)
    setImmediate(()=>{
        console.log('setImmediate')
        process.nextTick(()=>{
            console.log('nextTick2')
        })
    })
    process.nextTick(()=>{
        console.log('nextTick1')
    })
    process.nextTick(()=>{
        console.log('nextTick2')
    })
})







