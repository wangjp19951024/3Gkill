/**
 * user class
 */
 import Socket = require('socket.io');
 import IUser from './interface/user.interface';
 import { Room } from './room';

 export class User implements IUser {
    public static all : User[] = [];

    public socket : Socket.socket;

    public roomID : number;

    public deleted : boolean = false;

    public room : Room = undefined; //玩家所在的房间  |默认为undefined

    constructor (socket : any) {
        User.all.push(this);
        this.socket = socket;
    }

    /**将玩家从比赛中踢掉 */
    public static delete (user: User) {
        user.deleted = true;

    }

    /**退出房间 */
    public leaveRoom () {
        
    }
 }