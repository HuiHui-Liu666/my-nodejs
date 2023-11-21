/**
 * child_process 进程
 * 
 * 1、exec():回调 或者 流方式接收结果
 * 2、execSync()：同步版本
 * 3、execFile() 参数作为数组传入，具有较高的安全性:
 * 4、spawn()：与execFile类似。不能接收回调。只能通过事件监听输出结果
 *              data 是buffer对象，可以通过 toString('utf8') 转化
 * 5、fork():直接创建子进程 执行node脚本。
 */
var exec = require('child_process').exec;

// 通过回调接收
// exec('ls',(err,stdout,stderr)=>{
//     if(err){
//         console.log('stderr',stderr)
//     }
//     console.log('stdout:',stdout)
// })

// 流方式接收结果 类似于文件读写
// var child = exec('ls',{encoding:'utf8'});
// child.stdout.on('data',(data)=>{
//     console.log('data:',data)
// })
// child.stderr.on('data',(err)=>{
//     //打印err
//     console.log('err:',err)
// })


// 3、execFile
// const {execFile} = require('child_process');
// execFile('ls',['-a'],(err,stdout,stderr)=>{
//     if(err){
//         console.log('stderr',stderr)
//     }
//     console.log('stdout:',stdout)
// })

// 为啥安全性高：如果动态的path里面有些 反斜杠 或者 rm -rf的命令，会直接删除文件
// execFile 通过数组的形式传入参数，就会过滤一些敏感的字符串。如反斜杠等等
// var path = '../'
// // var path = '../ \ rm -rf'
// var child = exec(`ls -a ${path}`)
// child.stdout.on('data',(data)=>{
//     console.log('data:',data)
// })


// 4、spawn()
// const {spawn} = require('child_process');
// child = spawn('ls',['-a']);
// child.stdout.on('data',(data)=>{
//     // data 是buffer对象，可以通过 toString('utf8') 转化
//     console.log('data:',data)
// })

//  5、fork():直接创建子进程 执行node脚本。
// fork('./child.js') 相当于spawn('node',[./child.js]) 区别是：fork会在父子进程间建立一个通信管道pipe，
// 用于进程之间的通信，也是IPC通信的基础
var child_process = require('child_process')
var path = require('path')

// main里创建一个子进程
var child = child_process.fork(path.join(__dirname,'./child.js'))

// fork 之后会返回一个对象 用户通信
child.on('message',(data)=>{
    console.log('父亲接收到了数据:',data)
})
child.send('儿子好，我是你爸爸')
console.log('我是父亲，pid',process.pid)



