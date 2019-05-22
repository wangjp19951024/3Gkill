/**
 * 对牌的传递的记录
 * 类似于状态机
 */

 import Zone from '../enum/zone.enum';
 import Card from '../card';

 interface Move {
     fromSeatId ?: number;

     toSeatId ?: number;

     fromZone ?: Zone;

     toZone : Zone;

     cards : Card[];
 }

 export default Move;