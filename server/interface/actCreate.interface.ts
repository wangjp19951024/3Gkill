/**
 * create act interface
 */

 import Act from './act.interface';

 interface CreateAct {
     name : Act['name'];
     param ?: Act['param'];
 }

 export default CreateAct;