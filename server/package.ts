/**
 * 包含玩家所有数据的类
 * card []
 * act {}
 * skill {}
 * role {}
 * 
 */

import ActEnum from './enum/act.enum';
import Card from './card';
import Game from './game';
import CardEnum from './enum/card.enum';
import EquipEnum from './enum/equip.num';
import { CardInfo } from './card.d';
import ICard from './interface/card.interface';
import CreateCardClass from './interface/createCard.interface';
import CreateCardSubClass from './interface/createSubCard.interface';
import ISkill from './interface/skill.interface';
import CreateSkill from './interface/createSkill.interface';
import IGeneral from './interface/general.interface';
import CreateGeneral from './interface/createGeneral.interface';
import IAct from './interface/act.interface';
import ICreateAct from './interface/actCreate.interface';
import IActTypeContent from './interface/actTypeContent.interface';
import CreateActTypeContent from './interface/actCreateTypeContent.interface';
import { Player } from './player';

class Package {
    public name : string;

    public cardClassess : any = {}; //牌

    public skills : any = {}; //技能

    public generals : any = {}; //武将

    public actTypeContent : any = {}; //技能对牌的影响

    public act : any = {};

    constructor (name : string) {
        this.name = name;
    }

    /**牌组篇 */
    public getCardClass (card : CardInfo) : ICard {
        return this.cardClassess[card.class] || {package : this, type : 0, enabled : false};
    }

    /**获取牌组 */
    public createCardClass (createCardClass : CreateCardClass) : void {
        let cardClass = this.initCard(createCardClass);
        Game.cardClassess[cardClass.name] = this.cardClassess[cardClass.name] = cardClass;
    }

    /**声明一些静态方法 - 作为初始化card时的引用 */
    public static cardClassEnabledFalse = () => false;

    public static cardClassEnabledTrue = () => true;

    public static cardClassFilterSelectTrue = (card : Card, player : Player, selected : Player[], targets : Player[]) => targets;

    public static cardClassSelectCorrectlyDefault = () => true; //默认是true

    public static cardClassFilterTargetDefault = (card : Card, player : Player, targets : Player[]) => targets; 

    /**初始化牌组 */
    private initCard (createCardClass : CreateCardClass) : ICard {
        if (Game.cardClassess[createCardClass.name]) throw new Error(`Card ${createCardClass.name} already exist`);
        if (createCardClass.type === CardEnum.equip) {
            if (typeof createCardClass.equipType == 'undefined') throw new Error(`unkown equipType`);
            if (createCardClass.equipType === EquipEnum.Arm && typeof createCardClass.attackRange === 'undefined') throw new Error(`unkown attack`);
        }

        if (createCardClass.enabled === false) {
            createCardClass.enabled = Package.cardClassEnabledFalse;
        } else if (createCardClass.enabled === true) {
            createCardClass.enabled = Package.cardClassEnabledTrue;
        }

        if (!createCardClass.filterSelected) createCardClass.filterSelected = false;

        if (createCardClass.filterSelected) createCardClass.filterSelected = Package.cardClassFilterSelectTrue;

        if (!createCardClass.selectCorrectly) createCardClass.selectCorrectly = Package.cardClassSelectCorrectlyDefault;

        if (!createCardClass.filterTarget) createCardClass.filterTarget = Package.cardClassFilterTargetDefault;

        let create = createCardClass as ICard; //类型断言 (将createCardClass类型 断言为 ICard 类型)
        create.package = this;
        create.fullName = create.name;
        create.tipFullName = create.tipName;

        /**返回createClass 并且强制编译类型为 ICard*/
        return create;
    }

    public creatCardSubClass (createCardSubClass : CreateCardSubClass) {
        // let cardClass = this.initCard(createCardSubClass);
        let subCard = this.initSubCard(createCardSubClass);

        Game.cardClassess[subCard.name] = this.cardClassess[subCard.name] = subCard;
    }

    /**init subCard 返回类型：ICard */
    private initSubCard (createCardSubClass : CreateCardSubClass) : ICard {
        if (Game.cardClassess[createCardSubClass.fullName]) throw new Error(`subCard ${createCardSubClass.fullName} has already exsit`);
        let subCardClass : ICard = Game.cardClassess[createCardSubClass.name];  //subCard

        return {
            package : this,
            name : createCardSubClass.name,
            fullName : createCardSubClass.fullName,
            tipFullName : createCardSubClass.tipFullName,
            tipName : subCardClass.tipName,
            type : subCardClass.type,
            delay : subCardClass.delay,
            rotate : subCardClass.rotate,
            equipType : subCardClass.equipType,
            attackRange : subCardClass.attackRange,
            enabled : subCardClass.enabled,
            filterSelected : subCardClass.filterSelected,
            selectCorrectly : subCardClass.selectCorrectly,
            filterTarget : subCardClass.filterTarget,
            effect : subCardClass.effect,
            init : subCardClass.init
        }
    }

    /**技能篇 */
    public getSkill (skillName : string) : ISkill {
        return this.skills[skillName];
    }

    /**创建skill 类 */
    public createSkill (createSkill : CreateSkill) {
        let skill = this.initSkill(createSkill);
        Game.skills[skill.name] = this.skills[skill.name] = skill;
    }

    public static skillEnabledDefault = () => false;  // 能否出牌 默认返回false
    public static skillFilterCardDefault = () => []; //过滤牌组默认返回一个空数组

    public static skillFilterCardTrue = (skill : ISkill, player : Player, selectCards : Card[], cards : Card[]) => cards;

    public static skillFilterSelectTrue = (skill : ISkill, player : Player, cards : Card[], selected : Player[], targets : Player[]) => targets;

    public static skillSelectCorrectlyTrue = () => true;

    /**初始化 skill 初始化属性  返回ISkill接口*/
    private initSkill (createSkill : CreateSkill) : ISkill {
        if (Game.skills[createSkill.name]) throw new Error(`createSkill ${createSkill.name} has already exsit`);
        if (typeof createSkill.emperor === 'undefined') createSkill.emperor = false; //主公默认false

        if (!createSkill.enabled) createSkill.enabled = Package.skillEnabledDefault;

        if (typeof createSkill.maxCardCount === 'undefined') createSkill.maxCardCount = 0;

        if (typeof createSkill.minCardCount === 'undefined') createSkill.minCardCount = createSkill.maxCardCount ? 1 : 0;

        if (!createSkill.filterCard) createSkill.filterCard = Package.skillFilterCardDefault;

        if (createSkill.filterCard === true) createSkill.filterCard = Package.skillFilterCardTrue;

        if (!createSkill.filterSelected) {
            createSkill.filterSelected = false;
        } else if (createSkill.filterSelected === true) {
            // createSkill.filterSelected = Package.skillFilterSelectTrue;
        }
        if (!createSkill.selectCorrectly) createSkill.selectCorrectly = Package.skillSelectCorrectlyTrue;

        if (typeof createSkill.cancel === 'undefined') createSkill.cancel = true;

        let skill = createSkill as ISkill;

        skill.package = this;

        return skill;
    }

    /**武将篇 */
    public getGenerals (name : string) : IGeneral {
        return this.generals[name];
    }

    public createGeneral (createGeneral : CreateGeneral) {
        if (Game.generals[createGeneral.name]) throw new Error(`createGenereal ${createGeneral.name} has already exsit`);

        let general = createGeneral as IGeneral;
        general.package = this;
        Game.generals[general.name] = this.generals[general.name] = general;
    }

    /**玩家操作篇 */
    public createActTypeContent (createActTypeContent : CreateActTypeContent) {
        let actType = createActTypeContent.actType;
    }

    public static actTypeContentFilterCardDefault = () => [];
    public static actTypeContentFilterSelectDefault = () => false;
    public static actTypeContentSelectCorrectlyDefault = () => true;
    public static actTypeContentViewAsDefault = () => undefined;

    /**init act */
    private initActTypeContent (createActTypeContent: CreateActTypeContent) : IActTypeContent{
        if (Game.actTypeContent[createActTypeContent.actType]) throw new Error(`createActTypeContent, ${createActTypeContent.name} has already exist`);
        if (typeof createActTypeContent.maxCardCount === 'undefined') createActTypeContent.maxCardCount = 0;
        if (typeof createActTypeContent.maxCardCount === 'number') {
            let n = createActTypeContent.maxCardCount;
            createActTypeContent.maxCardCount = () => n; // maxCardCount 返回number的方法
        }

        if (typeof createActTypeContent.minCardCount === 'undefined') createActTypeContent.minCardCount = (player : Player) => (createActTypeContent as any).maxCardCount(player) ? 1 : 0;
        if (typeof createActTypeContent.minCardCount === 'number') {
            const n = createActTypeContent.minCardCount;
            createActTypeContent.minCardCount = () => n; //minCardCount 变成方法返回值的形式
        }
        
        /**属性的初始化 */
        if (!createActTypeContent.filterCards) createActTypeContent.filterCards = Package.actTypeContentFilterCardDefault;
        if (!createActTypeContent.filterSelect) createActTypeContent.filterSelect = Package.actTypeContentFilterSelectDefault;
        if (!createActTypeContent.selectCorrectly) createActTypeContent.selectCorrectly = Package.actTypeContentSelectCorrectlyDefault;

        let actTypeContent = createActTypeContent as any;
        actTypeContent.package = this;
        delete actTypeContent.actType;
        return actTypeContent;
    }

    public getAct (name : string) : IAct {
        return this.act[name];
    }

    public createAct (createAct : ICreateAct) {
        if (Game.act[createAct.name]) throw new Error(`createAct.name ${createAct.name} has already exsit`);
        let act = createAct as IAct;
        act.package = this;
        Game.act[act.name] = this.act[act.name] = act;
    }
}

export default Package;