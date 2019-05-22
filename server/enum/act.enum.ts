/**
 * 操作 enum 类型集合
 * 操作分为
 * 弃牌 - 出牌 - 要牌 - 仅使用牌 - 使用牌的技能 - 使用英雄的技能 - 使用装备技能或装备的额外加成
 */

enum Act {
    /**默认返回 无操作 */
    None,
    /**弃牌 - 每回合不能保留超过血量的牌，要弃掉 */
    disCard,
    /**出牌 */
    playCard,
    /**要牌 */
    responseCard,
    /**仅使用牌 */
    useCard,
    /**使用牌的技能 */
    selectCard,
    /**使用判定区的牌 */
    selectGlobalCard,
    /**发动英雄技能 */
    useSkill,
    /**使用装备 */
    selectSuit
}

export default Act;