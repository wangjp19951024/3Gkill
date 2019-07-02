/**服务 注册*/

import io = require('socket.io');
const http = require('http');
import Game from './game';

const app = http.createServer();
const ioS = io.listen(app);

Game.io = ioS;

ioS.sockets.on('connection', (socket) => {
    Game.onConnect(socket);
})

app.listen(process.env.PORT || 3000, () => {
    Game.listenOnPort();
    Game.init();
});
