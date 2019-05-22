/**
 * 对牌堆的操作
 * 添加，删除，插入某张牌
 */

 import * as util from '../utils/util';
 import Card from './card';
 import Game from './game';

 class Pile extends Array<Card> {
     /**
      * @template T
      * @param {T[]} cards
      * 移除目标cards所有牌
      */
     public remove (cards: Card[]) {
        if (cards == this) cards = [...cards];
        cards.forEach((card) => {
            for (let i = 0; i < this.length; ++i) {
                if (this[i].cardID === card.cardID) {
                    this.splice(i, 1);
                    return;
                }
            }
        })
     }

     /**
      * @template T
      * @param {T[]} cards 
      * 添加牌组
      */
     public add (cards) {
         this.push(...cards);
     }

     /**
      * @template T
      * @param {T[]} cards 
      * 将目标牌组替换原来的牌组
      */
     public set (cards) {
        this.splice(0);
        this.add(cards);
     }

     /**混乱牌序 */
     public shuffle (random : (a: number, b : number) => number) {
        return util.shuffle(this, random);
     }
 }

 export default Pile;