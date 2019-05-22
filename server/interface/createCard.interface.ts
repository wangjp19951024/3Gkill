/**
 * create Card interface
 * 创建牌组 接口
 */

 import Card from './card.interface';

 interface CreateCard {
    name : Card['name'];

    tipName : Card['tipName'];

    type : Card['type'];

    delay ?: Card['delay']; // ? 表可选参数 ，如果没传delay 就不能读取该参数，注意必须放在必选参数后面

    rotate ?: Card['rotate'];

    equipType ?: Card['equipType'];

    attackRange ?: Card['attackRange'];

    enabled : Card['enabled'] | boolean;

    filterSelected ?: Card['filterSelected'] | boolean;

    selectCorrectly ?: Card['selectCorrectly'];

    filterTarget : Card['filterTarget'];

    effect ?: Card['effect'];

    init ?: Card['init'];
 }

 export default CreateCard;