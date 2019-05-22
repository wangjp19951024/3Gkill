/**
 * User 接口， 定义user 的一些属性和方法
 * 玩家对象上就只挂了两个属性 - room | socket
 */

 import { Room } from '../room';
 import OriginalSocket from '../../soket/originalSocket';


 interface User {
    room : Room | undefined;
    socket : OriginalSocket;
 }

 export default User;