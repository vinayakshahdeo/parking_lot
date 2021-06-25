const Car = require('./car');

class ParkingSlot {

    constructor(totalSlots) {
        this.slots = new Array(totalSlots).fill(null);
        this.availableSlots = totalSlots;
    }
    //park car
    parkACar(color, registrationNumber) {}
    //remove car
    removeACar(slot) {}
    // get car by color
    getCarsByColor(color) {}
    //get slots by color
    getSlotsByColor(color) {}
    //get slots by registration number
    getSlotByRegistrationNumber(registrationNumber) {}
};

module.exports = ParkingSlot;