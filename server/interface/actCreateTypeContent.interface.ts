/**
 * create actTypeContent interface
 */

 import ActTypeContent from './actTypeContent.interface';
 import ActEnum from '../enum/act.enum';

 interface CreateActTypeContent {
    actType : ActEnum;

    minCardCount ?:number | ActTypeContent['minCardCount'];

    maxCardCount ?: number | ActTypeContent['maxCardCount'];

    filterCards ?: ActTypeContent['filterCards'];

    filterSelect ?: ActTypeContent['filterSelect'];

    selectCorrectly ?: ActTypeContent['selectCorrectly'];
 }

 export default CreateActTypeContent;