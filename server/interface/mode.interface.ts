/**
 * Mode interface
 */
import { Room } from '../room';

interface Mode {
    name : string;

    abstract? : boolean; //抽象

    init? : (room : Room) => void
}

export default Mode;