/**
 * 客户端的server
 */
import { successLog, warnLog } from '../utils/logger'
const IoC = require('socket.io-client');

const i = IoC.connect('http://127.0.0.1:3000');

i.on('connect', () => {
    successLog('user in');
});

i.on('firstMessage', (data) => {
    console.log(data, 'has received');
})

/**系统广播  所有人都可以收到信息*/
i.on('system', (data) => {
    warnLog(data);
})

i.on('disconnect', () => {
    warnLog('use out')
})

setTimeout(() => {
    i.emit('backMessage', {back: 'backMes'})
}, 1000);