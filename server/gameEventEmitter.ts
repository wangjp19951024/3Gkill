/**
 * GameEventEmitter
 */
import { GameEvent, GameSyncSKill, GameEventCanStop, SyncGameEventCanStop } from './enum/gameEvent.enum';

/**事件驱动 */
class EventEmitter<T extends number> {
    public _listeners : any = {};

    public on (event : T, _listener : (...args : any[]) => any, pri : number = 0) {
        this._listeners[event] = this._listeners[event] || [];
        let index = this._listeners[event].length;
        for (let i of Object.keys(this._listeners[event])) {
            if (pri > this._listeners[event][i].pri) {
                index = i;
                break;
            }
        }
        this._listeners.splice(index, 0, {_listener, pri});
        return this;
    }

    public listeners (event : T) : Array<{listener : (...args : any[]) => any, pri : number}> {
        return this._listeners[event] || [];
    }

    public removeListeners (event : T, listener : (...args : any[]) => any) {
        for (let i of Object.keys(this._listeners[event]).map(Number)) {
            if (i == event) {
                this._listeners[event] = this._listeners[event].filter((data : any) => data.listener != listener);
                break;
            }
        }
    }
}

/**gameEvent 继承自事件驱动 异步*/
class GameEventEmitter extends EventEmitter<GameEvent> {
    public enabled : boolean = false;
    public async emit (event : GameEvent, ...args : any[]) : Promise<any> {
        if (!this.enabled) return;
        let arr = this.listeners[event];
        let ret;
        for (let i of arr) {
            ret = await i.listener(...args);
            if (GameEventCanStop(event, ret)) return ret;
        }
        return ret;
    }

    public async callBackEmit (event : GameEvent, callBack : (listener : (...args: any[]) => Promise<any>) => Promise<any>) : Promise<void> {
        if (!this.enabled) return;
        let arr = this.listeners[event];
        for (let i of arr) {
            await callBack(i.listener);
        }
    }

    public on (event : GameEvent, listener : (...args : any[]) => any, pri : number = 0) : this {
        return super.on(event, listener, pri);
    }
}

/**同步 */
class GameEventEmitterSync extends EventEmitter<GameSyncSKill> {
    public emit (event : GameSyncSKill, ...args : any[]) : any {
        let arr = this.listeners[event];
        let ret;
        for (let i of arr) {
            ret = i.listener(...args);
            if (SyncGameEventCanStop(event, ret)) return ret;
        }
        return ret;
    }

    public callBackEmit (event : GameSyncSKill, callBack : (listener : (...args : any[]) => any) => any) : void {
        this.listeners(event).forEach((i) => {
            callBack(i.listener);
        })
    }

    public on (event : GameSyncSKill, listener : (...args : any[]) => any, pri : number = 0) : this {
        return super.on(event, listener, pri);
    }
}

export { EventEmitter, GameEventEmitter, GameEventEmitterSync };