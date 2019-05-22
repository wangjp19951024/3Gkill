/**
 * act Type
 * 针对操作需要改变牌的行为
 * todo Package 
 */

 import Card from '../card';
 import { Player } from '../player';

 interface ActTypeContent {
    packate : {};

    minCardCount : (player : Player) => number;

    maxCardCount : (player : Player) => number;

    filterCards : (player: Player, selectCards : Card[], cards : Card[]) => Card[];

    filterSelect : (
        /**
         * cards 选中的卡牌
         * 若返回false 则无需选择是否需要换牌
         */
        (cards : Card[], player : Player, selected : Player[], targets : Player[]) => Player[] | boolean
    );
    selectCorrectly : (cards : Card[], player : Player[], selected : Player[]) => boolean;
 }

 export default ActTypeContent;
