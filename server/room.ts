/**
 * Room
 */

 import util from '../utils/util';
 import { Player } from './player';
 import IUser from './interface/user.interface';
 import { Sockets } from './socket';
 import Card from './card';
 import Game from './game';
 import Pile from './pile';
 import Round from './round';
 import actEnum from './enum/act.enum';

 import Move from './interface/move.interface';
 export class Room {

    public static all : Room[] = [];

    public users : IUser[] = [];

    public socket : Sockets;

    public static idRange : number[] = util.getRangeArr(1, 9999); //房间号范围，自动生成

    public static id : number = 0;

    public players : Player[] = [];

    public cardIDs! : Set<number>;

    public cards : Card[] = [];

    public unKownCard : Card = new Card(this, Game.unKownCard);

    /**牌堆 */
    public cardPile : Pile = new Pile();

    /**弃牌堆 */
    public disCardPile : Pile = new Pile();

    /**出牌堆 */
    public disPosePile : Pile = new Pile();

    public macPlayerCount : number = 2;

   public rounds : Round[] = [];

   private _roundIndex : number = -1;

   public actPlayers : Player[];

   public act : actEnum = actEnum.None;

   public actName : string;

   public actParam : any;

   public restartAct = () => {};

   public actListeners : actListeners = [];


    public async moveCards (param : Move | Move[]) {
       let obj : any = {};
       if (!Array.isArray(param)) param = [param];
       let virtualInfo : any;
       param.forEach((p) => {

       })
    }

 }

 type actListeners = Array<{player: Player; eventName: string; listener: (data: any) => any}>;