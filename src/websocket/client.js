const WebSocket = require('ws')

const wss = new WebSocket('ws://127.0.0.1:8000')

// open 相当于建立一次握手
wss.on('open', function() {
    for(let i=0;i<3;i++){
        wss.send('hello from client '+i)
    }
})