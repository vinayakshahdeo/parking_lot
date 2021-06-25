const Car = require('./car');

class ParkingSlot {

    constructor(totalSlots) {
        this.slots = new Array(totalSlots).fill(null);
        this.availableSlots = totalSlots;
    }

    parkACar(color, registrationNumber) {
        for (let i in this.slots) {
            //uncomment for checking the parking lot allotment
            console.log(`slots count ${parseInt(i) + 1} and this.slots[i]: ${JSON.stringify(this.slots[i])}`);
            if (this.slots[i] === null) {
                //allocate ticket with natural numbers means dont start with 0
                this.slots[i] = new Car(color, registrationNumber, parseInt(i) + 1);
                this.availableSlots--;
                return `Car has been assigned the slot ${parseInt(i) + 1}`;
            }
        }
        return `Sorry, No slots are available`;
    }

    removeACar(slot) {
        //if available slots is of current length that means no car is parked!!
        if (this.availableSlots === this.slots.length) return `Error : Car Parking is empty`;
        //check if 
        if (slot + 1 > this.slots.length || slot < 0) return `Error : Car parking slot doesn't EXIST!!!`
        this.slots[slot] = null;
        this.availableSlots--;
        return `Car moved from the parked spot, now slot ${slot+1} is free`;
    }

    getCarsByColor(color) {
        const carRegistrationNumbers = [];
        for (let i in this.slots) {
            if (this.slots[i] !== null && this.slots[i].color === color) {
                carRegistrationNumbers.push(this.slots[i].registrationNumber)
            }
        }
        // uncomment to see carRegistrationNumbers array
        // console.log(carRegistrationNumbers);
        return carRegistrationNumbers ? carRegistrationNumbers : `No cars found matching the ${color} colour`;
    }

    getSlotsByColor(color) {
        const slotNumbers = [];

        for (let i in this.slots) {
            if (this.slots[i] !== null && this.slots[i].color === color) {
                slotNumbers.push(this.slots[i].slotNumber)
            }
        }

        return slotNumbers ? slotNumbers : `No slots found with cars matching the ${color} color`;
    }

    getSlotByRegistrationNumber(registrationNumber) {
        //this function assumes no 2 cars can have same registration number so make sure they are separate
        for (let i in this.slots) {
            if (this.slots[i] !== null && this.slots[i].registrationNumber === registrationNumber) {
                return this.slots[i].slotNumber;
            }
        }


        return `No car found with ${registrationNumber} registration number`;
    }
};

module.exports = ParkingSlot;