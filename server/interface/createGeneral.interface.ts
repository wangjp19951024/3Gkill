/**
 * create  general interface
 * 武将牌的属性
 */

 import Country from '../enum/country.enum';
 import Sex from '../enum/sex.enum';

 interface CreateGeneral {
    name : string;

    tipName : string;

    country : Country;

    sex : Sex;

    HP : number;

    skill : string[];
 }

 export default CreateGeneral;