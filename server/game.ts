import { successLog, hole } from '../utils/logger';
import ICard from './interface/card.interface';
import { CardInfo } from './card.d';
import Color from './enum/color';
import Suit from './enum/suit.enum';
export default class Game {
    constructor () {
        
    }

    /**socket  */
    public static io : any;

    /**card 牌组 */
    public static cardClassess : any = {}; //card 类型

    /**技能 */
    public static skills : any = {};

    /**武将 */
    public static generals : any = {};

    /**包 */
    public static packages : any = {};

    /**操作 */
    public static act : any = {};

    /**操作与牌的影响 */
    public static actTypeContent : any = {};

    /**牌组的移动 */
    public static modes : any = {};

    public static listenOnPort () {
        successLog('---------------->>>the game has start successfully<<<<------------');
    }

    public static init () {
        // successLog('game init');
        hole('game init');
    }

    public static onConnect(socket: any) {
        if (!socket) throw new Error('NO SOCKET ON USE');

        socket.emit('firstMessage', {message: 'hello CLient'});

        socket.on('backMessage', (data) => {
            successLog(data);
        })
    }

    /**获取card class */
    public static getCardClassess (card : CardInfo) : ICard {
        return this.cardClassess[card.class];
    }

    public static unKownCard : CardInfo = {
        cardID : 0,
        class : '',
        number : 0,
        suit : 0
    }

    /**根据花色获取 color - 红-黑 */
    public static getColor (suit : Suit) : Color {
        if (suit === Suit.Heart || suit === Suit.Diamond) return Color.Red;
        if (suit === Suit.Spade || suit === Suit.Club) return Color.Black;
        return Color.None;
    }
}