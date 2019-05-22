/**
 * phase 
 * 阶段 enum
 * 回合
 */
enum Phase {
    /**准备 */
    PrePare = 1,

    /**判定 */
    Judge = 2,

    /**抽 */
    Draw = 3,

    /**玩 */
    Play = 4,

    /**弃牌 */
    DisCard = 5,

    /**当前回合结束 */
    Over = 6
}