/**
 * create sub Card interface
 */
import Card from './card.interface';

import CreateCard from './createCard.interface';

 interface CreateSubCard {
    name : CreateCard['name'];

    fullName : Card['fullName'];

    tipFullName : Card['tipFullName'];

    init : CreateCard['init'];
 }

 export default CreateSubCard;