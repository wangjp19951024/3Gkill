/**
 * class player
 */

import IUser from './interface/user.interface';
import { Room } from './room';
import { Socket } from './socket';
import Pile from './pile';
import Card from './card';
import SkillEnum from './enum/skill.enum';
import IGeneral from './interface/general.interface';
import Country from './enum/country.enum';
import Sex from './enum/sex.enum';
import Identify from './enum/identity.enum';
 
export class Player {
    public user : IUser;

    /**socket 强制解析 ! 表示一定有值 与 ? 相对*/
    public socket! : Socket;

    /**座位号 */
    public seatID : number;

    /**手牌区 的牌*/
    public My : Pile = new Pile();

    /**判定区 的牌*/
    public judgeZone : Pile = new Pile();

    /**装备区牌组，默认undefined 最多只能装备四张牌，防具-兵器-马匹(+/-)*/
    public equipZone : Array<Card | undefined> = [undefined, undefined, undefined, undefined];

    /** 座位号*/
    public seatNum! : number;

    /**最大声命值 */
    public _maxHP! : number

    /**当前生命值 */
    private _HP : number;

    /**濒死状态 应对可能的判定*/
    private _alive! : boolean;

    /**技能 */
    public skills : SkillEnum[] = [];

    private flags : any = {};

    /**武将 属性必须*/
    private _general! : IGeneral;

    /**名字 属性必须 */
    private _name! : string;

    /**阵营 属性必须*/
    private _country! : Country;

    /**性别 属性必须*/
    private _sex! : Sex;

    /**身份 属性必须*/
    private _identify! : Identify;

    /**死亡  属性必须*/
    private _dying! : boolean;

    /**是否已跳身份 */
    public identityShow : boolean;

    private _back : boolean = false;

    constructor (user : IUser, seatid : number) {
        this.user = user;
        this.seatID = seatid;
    }

    public async drawCards (cards : Card[]) : Promise<void>;
    public async drawCards (num : number) : Promise<void>;
    public async drawCards (param : Card[] | number) : Promise<void> {
        if (typeof param === 'number') {
            let num : number = param;
            // let cards : Card[] = this.room
        } else {
            let cards : Card[] = param;
            
        }
    }

    public get room () : Room {
        return this.user.room as Room;
    }
}