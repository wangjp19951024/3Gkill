/**
 * 
 * class Card
 */
import { CardInfo } from './card.d';
import Color from './enum/color';
import Suit from './enum/suit.enum';
import Game from './game';
import { Room } from './room';
import Zone from './enum/zone.enum';
import ICard from './interface/card.interface';
import Move from './interface/move.interface';

export default class Card {
    // public cardInfo: CardInfo;
    /**cardType */
    private data : CardInfo;
    /**card 接口 的属性和方法 */
    private _class : ICard;

    public zone : Zone;

    public seatID : number = -1;

    public room : Room;

    public virtual : boolean = false; //是否由AI控制

    public realCards : Card[] = [];

    constructor (room : Room, data : CardInfo) {
        this.room = room;

        this.data = data;

        this._class = Game.getCardClassess(data);
    }

    public get cardID () {
        return this.data.cardID;
    }

    public get class () {
        return this._class;
    }

    /**获取牌上的数字 */
    public get number () : number {

        if (this.virtual) {
            let n = 0;
            n = this.realCards.map(c => c.number).reduce((n, m) => n + m, 0);
            if (n > 13) n = 13;
            return n;
        } else {
            return +this.data.number;
        }
    }

    /**获得花色 */
    public get suit () : Suit {

        if (this.virtual) {
            if (this.realCards.length === 1) return this.realCards[0].suit;
            return Suit.None;
        } else {
            return this.data.suit;
        }
    }

    /**获取牌的红-黑 */
    public get color () : Color {
        if (this.virtual) {
            if (this.realCards.length === 1)
                return Game.getColor(this.realCards[0].suit);
            else
                return this.realCards.every(c => c.color === Color.Red) && Color.Red || this.realCards.every(c => c.color === Color.Black) && Color.Black || Color.None;
        } else {
            return Game.getColor(this.suit);
        }
    }

    /**是否在手牌里 */
    public get inHand () : boolean {
        return this.zone == Zone.Hand;
    }

    /**是否在装备区里 */
    public get inEquip () : boolean {
        return this.zone == Zone.Equip;
    }

    /**对牌的移动规则 */
    public async move (param : Move) {
        await this.room.moveCards(Object.assign(param, {cards : [this]}));
    }
}


