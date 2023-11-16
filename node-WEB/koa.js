var koa = require('koa')
var path = require('path')
var fs = require('fs')
var route = require('koa-route')
var app = new koa()


// const log = new Promise((resolve,reject)=>{
//     // 等待10秒之后打印
//     setTimeout(()=>{
//         console.log('十秒之后，进行打印')
//         resolve()
//     },2000)
// })


// const main = async (ctx)=>{
//     // 修改了body之后，koa底层会自动将status改为200，set劫持
//     // ctx.response.body = 'hello world!'
//     // koa默认返回类型是 text/plain 
//     // ctx.request.accepts 判断客户端需要什么类型 然后通过：ctx.response.type 设置成相应的内容
//     //  返回 html模版
//     var data = fs.createReadStream(path.resolve(path.join(__dirname,'./demo.html')))
//     ctx.response.type = 'html'
//     ctx.response.body = data
//     // await log()
//     if(ctx.request.path == '/home'){
//         ctx.response.redirect('about')
//     }
// }


const main = (ctx)=>{
    var dataArr = []
    // 需要数组去合并数据
    ctx.req.addListener('data',(data)=>{
        dataArr.push(data)
    })

    ctx.req.addListener('end',(data)=>{
        let d = Buffer.concat(dataArr).toString()
        console.log('----end:',d)
    })

    console.log('koa-body:',ctx.request.body)

}

// koa-route start!!!
// const about = ctx=>{
//     ctx.response.type = 'html'
//     ctx.response.body = '<h1>about</h1>'
// }
// const home = ctx=>{
//     ctx.response.type = 'html'
//     ctx.response.body = '<h1>home</h1>'
// }
// app.use(route.get('/',home))
// app.use(route.get('/about',about))
// app.use(route.get('/about1/:id',about))
// koa-route end!!!!


// app.use(koaBody)

// app.use(main)
app.use(route.post('/',main))

app.listen(3000)