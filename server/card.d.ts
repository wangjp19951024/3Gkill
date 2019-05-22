
/**
 * card.d.ts
 */

 type Card = number;
 type HP = number;


 /**
  * 牌组信息
  * 注册牌组的信息
   */
 interface CardInfo {
    cardID: number,
    class: string,
    number: number,
    suit: number
 }

 /**
  * 玩家手牌
  * 分为血勾玉 - 手牌(有上限，不能超出血条) - 装备区 - 技能牌判定区 - 出牌区
  */
 interface UserCard {
     /**手牌 */
    My: Card[];
    /**血条 */
    HP: HP;
    /**装备区 */
    equipCard: Card[];
    /**技能判定区 */
    skillJudge: Card[];
    /**出牌区 */
    Out: Card[];
 }

 export { CardInfo, UserCard };