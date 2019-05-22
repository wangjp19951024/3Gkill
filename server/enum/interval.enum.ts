/**
 * 出牌的时间限制
 */

enum Interval {
    /**要牌后到出牌的时间 到时强制弃牌*/
    phase = 400,

    /**锦囊牌的判定时间 */
    Judge = 500
}

export default Interval;