/**
 * gameEarlierEventEmitter
 */

 import { GameEarlierEvent, GameEarlierCanStop  } from './enum/gameEarlierEvent';
 import { EventEmitter } from './gameEventEmitter';

 class GameEarlierEventEmitter extends EventEmitter<GameEarlierEvent> {
    public async emit (event : GameEarlierEvent, ...args : any[]) : Promise<any> {
        let arr = this.listeners(event);
        let ret;
        for (let a of arr) {
            ret = await a.listener(...args);
            if (GameEarlierCanStop(event, ret)) return ret;
        }
        return ret;
    }

    public async callBackEmit (event : GameEarlierEvent, callBack : (listener : (...args : any[]) => Promise<any>) => Promise<any>) : Promise<void> {
        let arr = this.listeners(event);
        for (let a of arr) {
            await callBack(a.listener);
        }
    }

    public on (event : GameEarlierEvent, listener : (...args : any[]) => any, pri: number = 0) : this {
        return super.on(event, listener, pri);
    }
 }

 export default GameEarlierEventEmitter;