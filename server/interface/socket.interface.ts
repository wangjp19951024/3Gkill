/**
 * socket 接口
 * 接口中有一些经常调用的方法
 * 如on/emit等绑定事件，触发事件等常用方法
 */

interface Socket {
    emit (event: string | symbol, ...args: any[]) : boolean; //emit 方法, 绑定一个事件, 参数就是要发送的数据  | 表联合类型

    on (event : string | symbol, listener: (...args: any[]) => void, ...args : any[]) : this; //对应的on方法 , listener是指回调函数, this 返回当前对象或类

    once (event: string | symbol, listener: (...args: any[]) => void, ...args: any[]) : this; //once 方法

    removeListener (event: string | symbol, listener: (...args: any[]) => void) : this; //移除绑定的某一个事件

    removeAllListener (event: string | symbol) : this; //移除所有的事件
}

export default Socket;