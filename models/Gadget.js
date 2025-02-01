import { v4 as uuidv4 } from 'uuid';

class Gadget {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
        this.status = 'Available'; // Default status
    }
}

export default Gadget;
