const http = require('http') //1.1
const http2 = require('http2') //2.0  https的使用和http2的使用差不多
const fs = require('fs')
const path = require('path')
//启动一个简单的http服务 1.1
// http.createServer((req,res)=>{
//     res.writeHead(200,{'content-type':'text/html'})
//     res.write('<h1>hell world!</h1>')
//     res.end('<p>end</p>')
// }).listen(3000)
// console.log('HTTP server is listening at port 3000.')


// http2.0 ：
// http2.0 一般只支持https，但也支持http协议。
// http + ssl（加密：公key 私key） = https 
// 本地生成 ：openssl req -newkey rsa:2048 -nodes -keyout rsa_private.key -x509 -days 365 -out cert.crt
const server = http2.createSecureServer({
    key:fs.readFileSync(path.join(__dirname,'./rsa_private.key')),
    cert:fs.readFileSync(path.join(__dirname,'./cert.crt'))
})

server.on('error',(err)=>{
    console.log('err:',err)
})
server.on('stream',(stream,headers)=>{
    // 状态码：前面需要加冒号；不冒号 200只会出现在响应头里面
    stream.respond({
        'content-type':'text/html',
        ':status':201
    })
    stream.end('<h1>http2</h1>')
})
server.listen(3001)
console.log('3001')
