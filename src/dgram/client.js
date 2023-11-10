const dgram = require('dgram');
const message = Buffer.from('我 hello');
const client = dgram.createSocket('udp4');
// 发送二进制 字符串都可以。
client.send(message, 41234, 'localhost', (err) => {
    // 数据发送完毕之后 记得关闭。
  client.close();
});
