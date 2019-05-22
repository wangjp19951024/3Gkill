/**
 * skill interface
 * 武将技能 接口
 */

 import Card from '../card';
 import { Player } from '../player';
 import { Room } from '../room';
 import SkillEnum from '../enum/skill.enum';
 //TODO package module 未定义

 interface ISkill {
    package : {};

    name : string;

    tipName? : string;

    emperor : boolean; //是否是主公(决定是否增加血条上限)

    type : SkillEnum;

    enabled : (player : Player) => boolean;

    minCardCount : number;

    maxCardCount : number;

    filterCard : (skill : ISkill, player : Player, selectedCards : Card[], cards : Card[]) => Card[];

    filterSelected : ((skill : ISkill, player : Player, cards : Card[], selected : Player[]) => boolean) | false;

    selectCorrectly : (skill : ISkill, player : Player, cards : Card[], selected : Player[]) => boolean;

    cancel : boolean;

    effect? (skill : ISkill, player : Player, skillParam : any) : Promise<any>;

    viewAs? (skill : ISkill, player : Player, cards : Card[], selected : Player[], skillParam : any) : Card[];

    init? (room : Room) : void;
 }

 export default ISkill;