cards 
存放所有的牌，
牌的分类：
一副牌就是一副标准的扑克牌
每张扑克牌的上的标识是固定的，只是打乱了牌的顺序, 武将牌和其他牌单独分开，开局先发武将牌，公共牌是装备牌和技能牌
可扩展牌的数量。
1: 武将牌 
    [武将牌的id] id : {
    [武将的血量]: HP: 3, 血勾玉 <number 类型>
    [武将牌的名字] name: '', <string 类型>
    [武将的阵营] guild: number, <1, 2, 3> 三个阵营 <number 类型>
    [武将牌上的技能] skill : [...], 技能 <array[]>
    [武将的位置距离] distance: [a, b] 两个位置，a => 自己对其他人的位置，b => 其他人对自己的位置，默认都为1 可以通过装备加成,无装备时都为1 <array[]>

};
2: 装备牌 (青钢剑， 仁王盾...)
    [装备牌id] id : {
            [装备牌攻击距离]: distance, 负数 - N <number 类型> ||装备好后，表示该武将的位置距离[0] - N
            [装备技能] skill : number , <number 类型>
            [装备名字] name : '', <低位1 - 13><string 类型> 
    }
3: 操作牌 (桃，酒..., 杀, 闪)
    [操作牌] id : {
        [操作牌名称] name : '' <string> 
        [操作牌功能] func : '' <string>
    }
4: 组合技 (酒杀...)