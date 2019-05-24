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
 import { GameEventEmitter, GameEventEmitterSync } from './gameEventEmitter';
 import GameEarlierEventEmitter from './gameEarlierEventEmitter';

 import Move from './interface/move.interface';
 import Identity from './enum/identity.enum';
 export class Room {

    public static all : Room[] = [];

    public users : IUser[] = [];

    public socket : Sockets;

    public static idRange : number[] = util.getRangeArr(1, 9999); //房间号范围，自动生成

    public id : number = 0;

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

   public events = new GameEventEmitter();

   public syncEvents! : GameEventEmitterSync;

   public earlierEvents! : GameEarlierEventEmitter;

   public globalCardsWindowFirstTitle! : string;

   public globalCards : Card[] = []; //出现五谷丰登的情况，需要所有人选牌的牌

   private modeName : string = 'StandardIdentityMode';

   private includedComponent : any = {};

   private isIncludingMode : boolean = false;

   public identityGuess : Identity[] = []; //一个猜身份的数组，选中之后，该身份对自己可见

   public virtual : boolean;

   private allRandom : number[] = [];

   private randomIndex : number = 0;

   private restart : boolean = false;

   constructor (virtual : false, restart : true) {
      this.virtual = virtual;
      this.restart = restart;
      if (virtual) return;
      Room.all.push(this); //将当前创建的房间放到all中
      let random = util.random(0, Room.idRange.length - 1);
      this.id = Room.idRange[random];
      Room.idRange.splice(random, 1);
   }

   public static getRoom (roomID) : any {
      return;
   }

   /**delete  */
   public static delete (room : Room) {
      let i = Room.all.indexOf(room);
      if (~i) {
         Room.all.splice(i, 1);
         Room.idRange.push(room.id);
      }
      [...room.users].forEach((u) => {
         if (u instanceof IUser) {}
      })
   }


    public async moveCards (param : Move | Move[]) {
       let obj : any = {};
       if (!Array.isArray(param)) param = [param];
       let virtualInfo : any;
       param.forEach((p) => {

       })
    }

 }

 type actListeners = Array<{player: Player; eventName: string; listener: (data: any) => any}>;