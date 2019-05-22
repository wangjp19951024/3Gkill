/**
 * socket 实现了socket 接口的类
 * 提供了emit /on 等常见的的socketio 的方法
 */
import ISocket from './interface/socket.interface';
import OriginalSocket from '../soket/originalSocket';
import Game from './game';
import Response from './interface/response.interface';
import { Room } from './room';
import { Player } from './player';

export class Socket implements ISocket {

    public room : Room;

    public player : Player;

    public socket : OriginalSocket;

    public events : Set<string | symbol> = new Set();

    public listenMap : Map<() => void, () => Promise<void>> = new Map();

    public record : Response[] = [];

    constructor (player: Player) { /**传入一个玩家信息，就建立了一条socket 每个玩家都有一个socket, 用于实时收发消息*/
        /**实例化socket 传入的玩家 */
        this.player = player;

        /**将玩家所处的房间 提升为Socket 变量 */
        this.room = player.room;

        /**玩家的socket */
        this.socket = player.user.socket;
    }

    /**
     * 重写emit 绑定方法,通过这个方法将信息传递到客户端
     * @param events 
     * @param args 
     */
    public emit (events: string | symbol, ...args: any[]) : boolean {
        return this.socket.emit.apply(this.socket, arguments);
    }

    /**
     * 重写on 接收方法
     * 这个方法接收来自客户端的信息
     */
    public on (event: string | symbol, listener : (...args: any[]) => void, reject : (reason?: any) => void) : this {
        let decoratedListener = async (...args: any[]) => {
            this.record.push({event, args})
            try {
                await listener(args); //listener 处理函数
            } catch (err) {
                reject(err); //抛出异常
            }
        };

        this.listenMap.set(listener, decoratedListener);
        this.events.add(event);
        this.socket.on(event, decoratedListener); /**调用socket.io的原生的on方法，绑定event事件 decoratedListener 是回调方法 */

        return this;
    }

    public once (event: string | symbol, listener: (...args: any[]) => void, reject: (reason?: any) => void) : this {
        let decoratedListener = async (...args: any[]) => {
            this.record.push({event, args})
            try {
                await listener(args); //listener 处理函数
            } catch (err) {
                reject(err); //抛出异常
            }
        };

        this.listenMap.set(listener, decoratedListener);
        this.events.add(event);
        this.socket.on(event, decoratedListener); /**调用socket.io的原生的on方法，绑定event事件 decoratedListener 是回调方法 */

        return this;
    }

    public get broadCast () : Sockets { /**发布公告，向除自己之外的所有人 */
        return new Sockets(this.room.players.filter(p => p != this.player));
    }

    public removeListener (event: string | symbol, listener: (...args: any[]) => void) : this {
        let decoratedListener = this.listenMap.get(listener); /**获取lisnter 对应的事件 */
        this.listenMap.delete(listener); /**删除lisnter */
        this.socket.removeListener(event, decoratedListener || listener); /** socket */
        return this;
    }

    public removeAllListener (event: string | symbol) : this {
        this.socket.removeAllListener.apply(this.socket, arguments);
        return this;
    }

    /**
     * 清理所有的玩家监听事件
     */
    public clearListener () : void {
        this.events.forEach(e => {
            this.removeAllListener(e);
        })
    }
}


/**
 * 继承自Array的Sockets 类
 * 构造函数实例化要传入一个Player 数组
 */
export class Sockets extends Array<Socket> {
    constructor (players: Player[]) {
        super();

        if (!players.length) return;
        let room = players[0].room;
        players.forEach((player) => this.push(player.socket || (player.socket = new Socket(player))));
    }

    public emit (event: string | symbol, ...args: any[]) : Sockets {
        this.forEach(socket => {
            socket.emit.apply(socket, arguments);
        });
        return this;
    }

    /**
     * AI 
     * @param event 
     * @param args 
     */
    public emitAI (event: string | symbol, ...args: any[]) : Sockets {
        return this;
    }

    public on (event: string | symbol, listener: (...args: any[]) => void) : Sockets {
        this.forEach(socket => {
            socket.on.apply(socket, arguments);
        })
        return this;
    }

    public once (event: string | symbol, listener: (...args: any[]) => void) : Sockets {
        this.forEach(socket => {
            socket.once.apply(socket, arguments);
        })
        return this;
    }

    public removeListener (event: string | symbol, listener: (...args: any[]) => void) : Sockets {
        this.forEach(socket => {
            socket.removeListener.apply(socket, arguments);
        })
        return this;
    }

    public removeAllListener (event: string | symbol) : Sockets {
        this.forEach(socket => {
            socket.removeAllListener.apply(socket, arguments);
        })
        return this;
    }

    public clearListeners () {
        this.forEach(socket => {
            socket.clearListener.apply(socket, arguments);
        })
        // return this;
    }
}