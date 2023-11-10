/**
 * 只需要知道 Buffer: 操纵二进制的 就可以了
 * 
ArrayBuffer:原始二进制数据 不能直接读写
TypedArray：用来读写简单类型的二进制数据 可以通过下标修改数值。
DataView：用来读写复杂类型的二进制数据

buffer 可以通过for of 进行遍历
“我是谁” 一个汉字两个字符
buffer 实例也是 Unit8Array实例：buffer对象的内存是被拷贝到 typedArray 而不是共享。
 */
console.log(Buffer.alloc(10,1))
console.log(Buffer.from([1,2,3]))
console.log(Buffer.from("hello"))
console.log('Buffer',Buffer.from('latin1', 'latin1'))
str = "我是谁"
let buf = new ArrayBuffer(str.length*2)
// ArrayBuffer 不能直接读写，需要通过 TypedArray 实现读写操作
var bufView = new Uint8Array(buf) // 术属于 TypedArray
for(var i=0;i<str.length*2;i++){
    bufView[i] = str.charCodeAt(i)
}
console.log(bufView)