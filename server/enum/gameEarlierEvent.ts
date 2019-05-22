/**
 * 初始化牌组的时候，需要做的一些额外操作
 */

 enum GameEarlierEvent {
     /**发牌 */
    DealCards,

    /**身份 */
    DealIdentity,

    /**额外体力上限 */
    ExtraMaxHP,

    /**额外技能 */
    ExtraSkill
 }

 const GameEarlierCanStop = (event : GameEarlierEvent, ret : any) : boolean => {
    switch (event) {
        case GameEarlierEvent.DealIdentity:
            return true;
            break;
        default :
            return false;
    }
 }

 export { GameEarlierEvent, GameEarlierCanStop };