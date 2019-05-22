/**zone 玩家所能支配的区域 */

enum Zone {
    /**手牌 */
    Hand = 1,
    /** 牌堆*/
    PublicCards = 2,
    /**弃牌的堆 */
    DisCardPile = 3,
    /**坐骑 */
    Dispose = 4,
    /**判定区的牌 */
    Judge = 5,
    /** 装备牌*/
    Equip = 6
}

export default Zone;