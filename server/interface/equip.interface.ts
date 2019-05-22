import EquipType from '../enum/equip.num';

/**装备接口 */
interface Equip {
    /**牌的名字 */
    name: string;

    /**牌的技能 */
    skill: string;

    /**装备或马匹的距离 */
    distance: number;

    /**装备类型 */
    equipType: EquipType;

}