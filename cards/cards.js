'use strict'

/**
 * 一副标准牌
 * 104张标准牌和 + 4张额外的牌 [寒冰剑（黑桃2），仁王盾（梅花2），银月枪（方块Q），闪电（红桃Q）]
 * 由于牌的功能已经是固定的，所以就设计成3大类 - 普通牌53张 | 精囊牌35张 | 装备牌20张
 * [装备牌] 30张 3张红桃 - 6张方片 - 7张黑桃 - 14张梅花
 * 黑色牌一般为攻击型牌 - 红色牌多是防守型牌
 * 
 */
const cards_Vec = [
    0x101, 0x102, 0x103, 0x104, 0x105, 0x106, 0x107, 0x108, 0x109, 0x10a, 0x10b, 0x10c, 0x10d,  //黑桃
    0x201, 0x202, 0x203, 0x204, 0x205, 0x206, 0x207, 0x208, 0x209, 0x20a, 0x20b, 0x20c, 0x20d,  //红心
    0x301, 0x302, 0x303, 0x304, 0x305, 0x306, 0x307, 0x308, 0x309, 0x30a, 0x30b, 0x30c, 0x30d,  //梅花
    0x401, 0x402, 0x403, 0x404, 0x405, 0x406, 0x407, 0x408, 0x409, 0x40a, 0x40b, 0x40c, 0x40d,  //方块
    0x010, 0x020  // 大小王
];


/**
 * 
 * 普通牌 [杀牌] 共30张
 * 这里规定 - card & 0xFF === 1 就为杀牌
 * 花色为红桃 - 方片 - 黑桃 - 梅花
 */
const cards_nomal_kill = [
    0x201, 0x201, 0x201,
    0x401, 0x401, 0x401, 0x401, 0x401, 0x401,
    0x101, 0x101, 0x101, 0x101, 0x101, 0x101, 0x101,
    0x301, 0x301, 0x301, 0x301, 0x301, 0x301, 0x301, 0x301, 0x301, 0x301, 0x301, 0x301 0x301, 0x301
];

/**
 * 普通牌 [闪牌] 共15张
 * 这里规定 - card & 0xFF === 2 就为闪牌
 * 三张红桃 - 12张方片
 */
const cards_nomal_flash = [
    0x202, 0x202, 0x202,
    0x402, 0x402, 0x402, 0x402, 0x402, 0x402, 0x402, 0x402, 0x402, 0x402, 0x402, 0x402,
];

/**
 * 普通牌 [桃] 共8张
 * 规定 - card & 0xFF === 3 为桃
 * 7张红桃 -  1张方片
 */
const cards_nomal_tao = [
    0x203, 0x203, 0x203, 0x203, 0x203, 0x203, 0x203, 
    0x403
];

/**
 * 装备牌 -> <武器防具 + 坐骑> 共20张牌
 * 11张武器 + 3张防具 + 3匹 （+ 1马） + 3匹 （- 1马）
 * 装备牌 [武器牌] 11张
 * 规定 card & 0xFF === 4 && card >> 4 === 5 为装备牌
 * 武器范围从 1 - 4 顺序排列 分别是
 * card & 0xFF 为武器的攻击距离
 */
const cards_equip_weapons = [
    0x501, 0x501, 
];
