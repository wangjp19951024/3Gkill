/**
 * act 操作的接口
 * 游戏里有时会出现一些牌被当作成另一些牌的情况，这里需要对这类操作进行过滤操作
 */

 interface Act {
    package: {},
    name: string,
    param ?: any
 }

 export default Act;