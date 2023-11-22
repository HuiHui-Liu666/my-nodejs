const app  = require('express')();
const http = require('http').Server(app);

const io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
io.on('connection', (socket) => {
    console.log('a user connected');
// chat msg 消息名 自定义的
    socket.on('chat msg', (msg) => {
        console.log('msg from client '+msg);
        socket.send('server says:'+msg);
    });
})
http.listen(3000, () => {
    console.log('listening on :3000');
})