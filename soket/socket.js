'use strict'
/**
 * 这里使用的是http协议来建立socket.io通信
 */
const io = require('socket.io');
const http = require('http');
const fs = require('fs');


const app = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello socket');
});

const ios = io.listen(app);
app.listen(3000);
ios.set('log level', 1); //socket 日志等级

console.log('server app is running at port : %d', 3000);

ios.sockets.on('connection', (socket) => {
    console.log('user in');
    socket.emit('message', {message: 'hello socket io message'}); //emit 是绑定事件，客户端通过这个事件名message就可以获取到对应的事件回调，就是传递的信息
    socket.on('callbackMessage', (data) => { //监听客户端的事件，并获取回调里的信息 [双工通信]
        console.log(data);
    });
    socket.on('disconnect', () => {
        console.log('user out');
    })
});

// exports.ios = ios;

