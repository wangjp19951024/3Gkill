/**
 * user class
 */
 import Socket = require('socket.io');
 import IUser from './interface/user.interface';
 import { Room } from './room';
 import { successLog } from '../utils/logger';

 export class User implements IUser {
    public static all : User[] = [];

    public socket : Socket.socket;

    public roomID : number;

    public deleted : boolean = false;

    // public room : Room = undefined; //玩家所在的房间  |默认为undefined

    constructor (socket : any) {
        User.all.push(this);
        this.socket = socket;
    }

    public get room () : Room | undefined {
        return Room.getRoom(this.roomID);
    }
    public get sameRoom () : any {
        return this.socket.in(`room ${this.roomID}`);
    }

    public get sameRoomOthers () : any {
        return this.socket.broadcast.in(`room ${this.roomID}`);
    }

    /**将玩家从比赛中踢掉 */
    public static delete (user: User) {
        user.deleted = true;

    }

    /**退出房间 */
    public leaveRoom () {
        if (!this.roomID) return;
        this.socket.leave(`room ${this.roomID}`);
        let room = this.room;
        if (room) {
            for (let u of room.users) {
                if (this === u) { //若该玩家在房间里，则从room.users中删除
                    room.users.splice(room.users.indexOf(u), 1);
                    break;
                } 
            }
        }
        successLog(`a user leave room ${this.roomID}`);
        this.roomID = 0;
        this.sameRoom.emit('leave room', false);
        if (!this.deleted) {
            this.socket.emit('leave room', true);
        }
        if (room && room.macPlayerCount === 0) {
            Room.delete(room);
        }
    }
 }

 export default User;