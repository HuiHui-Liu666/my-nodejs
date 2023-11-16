var koa = require('koa')
var path = require('path')
var fs = require('fs')
var route = require('koa-route')
var app = new koa()
var os = require('os')
const { default: koaBody } = require('koa-body')

//  实现文件上传 
const main = async (ctx)=>{
    const tmpdir = os.tmpdir() //创建一个系统的临时目录
    const filePaths = [] //最终生成的文件地址
    const files = ctx.request.files || {} //koa-body会自动处理并挂载到它自己定义的一个目录
    for(let key in files){ //文件时分段传输的
        const file = files[key]

        const filePath = path.join(tmpdir,file.originalFilename) //生成自己指定的目录
        
        const reader = fs.createReadStream(file.filepath)
        const writer = fs.createWriteStream(filePath)
        console.log('path:',file.originalFilename)

        reader.pipe(writer) //真正去执行读写的过程

        filePaths.push(filePath)

    }
    console.log('请求参数：',ctx.request.body)
    ctx.body = filePaths //返回存放目录
}


// app.use(main)
app.use(koaBody({multipart:true}))

app.use(route.post('/upload',main))

app.listen(3000)