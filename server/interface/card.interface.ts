/**
 * card interface
 * 具体是对card class 的属性的定义
 */

 import Card from '../card';
 import CardEnum from '../enum/card.enum';
 import EquipEnum from '../enum/equip.num';
 import { Player } from '../player';
 import { Room } from '../room';

 interface ICard {
    package: {};
    
    name : string;

    fullName : string;

    tipName : string;

    tipFullName : string;

    type : CardEnum;

    delay ?: Boolean;

    rotate ?: Boolean;

    equipType : EquipEnum;

    attackRange : number; //攻击范围

    enabled : (card : Card, player : Player)  => boolean; //是否能对该玩家出这张牌

    filterSelected : ((card : Card, player : Player, selected: Player[], targets : Player[]) => Player[]) | false; //是否有技能能够将这张牌换成其他牌,默认false

    selectCorrectly : (card : Card, player : Player, selected : Player[]) => boolean; //是否是正确选择了这张牌

    filterTarget : (card : Card, player : Player, targets: Player[]) => Player[];  //针对某些英雄的技能能够将这张牌造成的伤害转移到其他玩家上的操作

    effect ? (card : Card, source : Player | undefined, selected: Player[], targets: Player[], target : Player) : Promise<boolean | void>;

    init ? (room : Room) : void;
 }

 export default ICard;