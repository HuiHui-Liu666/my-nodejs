const { error } = require('console')
const fs = require('fs')
const path = require('path')
// fs.open(path.join(__dirname,'./1.txt'), 'w', (err, fd) => {
//     if (err) {
//         console.log(err)
//       if (err.code === 'EEXIST') {
//         console.error('myfile already exists');
//         return;
//       }
  
//       throw err;
//     }
//   console.log(fd)
//     // writeMyData(fd);
//   });

  let readStream = fs.createReadStream(path.join(__dirname,'./1.txt'),{encoding:'utf8'})
//   console.log('readStream:',readStream)

  readStream.on('error',(err)=>{
    console.log('error:',error)
  })

  readStream.on('open',(fd)=>{
    console.log('open:',fd)
  })

  readStream.on('ready',()=>{
    console.log('ready:')
  })
  readStream.on('data',(chunk)=>{
    console.log('data:',chunk)
  })
  readStream.on('end',()=>{
    console.log('end:','读取完毕！')
  })
  readStream.on('close',()=>{
    console.log('close:','读取关闭！')
  })



  /**
 fs.exists(path,()=>{}) //判断文件存不存在。已经废弃了
可以使用access 查看文件的可访问性
但是不建议 再打开/写入/读取前使用这个。查看官网文档具体。
推荐使用： open 在回调函数里面 判断：err.code
fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }
    throw err;
  }
  writeMyData(fd);
});

读取大文件的时候 主要是用 createReadStream ：主要事件
error，open/ready/data/end/close 

修改权限： chmon 444 test.js 【只读】
【主要掌握open readFile createReadStream 即可】
wrx 421 
   */