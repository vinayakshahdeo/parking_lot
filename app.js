    const express = require('express');
    const fs = require('fs');
    const readLine = require('readline');

    const commandLineInputs = process.argv;
    //take input from user to determine action
    const askUserInputInTerminal = () => {

        const prompts = readLine.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        let choiceString = `Please read the options for interaction\n`;
        choiceString += `1. Create a Parking lot\n`;
        choiceString += `2. Park a Car into a parking slot\n`;
        choiceString += `3. Remove a Car from parking slot\n`;
        choiceString += `4. Find Cars by color\n`;
        choiceString += `5. Find Parking slots by color\n`;
        choiceString += `6. Find a slot by Car registration Number\n`;
        choiceString += `7. RESET(RESETS PARKING)\n`;
        choiceString += `Enter your option for input :\n`;
        prompts.question(choiceString, function (data) {
            processUserInputs(data);
        });
    }

    askUserInputInTerminal();

    const ParkingLot = require('./models/parkingSlot');
    let parking = null;

    const processUserInputs = (choice) => {
        //check for invalid numbers
        if (isNaN(parseInt(choice)) === true) {
            console.log(`Invalid Input, please try again`);
            //prompt the display again
            askUserInputInTerminal();
            return;
        }
        //else 
        const prompts = readLine.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        //make choices for actions
        ////check for parking in all cases except when to set the parking
        switch (choice) {
            case `1`:
                //car parking capacity needed as first input so parking will be undefined using !parking === !undefined === true
                if (!parking) {
                    prompts.question(`Please enter parking lot capacity :\n`, (maxSlots) => {
                        parking = new ParkingLot(parseInt(maxSlots));
                        askUserInputInTerminal();
                    });
                } else {
                    console.log(`Sorry, you have already set capacity for parking lot, please select any other option`);
                    askUserInputInTerminal();
                }
                break;
                //input the car variables i.e color and reg ex: red vin01 expected break using space should yield ["red"] ["vin01"]
            case `2`:
                if (!!parking) {
                    prompts.question(`Please enter car colour and registration number separated by space :\n`, (carDetailsStr) => {
                        if (carDetailsStr) {
                            //splits string into two pieces
                            let carDetails = carDetailsStr.split(' ');
                            console.log(parking.parkACar(carDetails[0], carDetails[1]));
                        } else {
                            console.log(`Can't insert empty cars into parking\n`)
                        }
                        askUserInputInTerminal();
                    });
                } else {
                    console.log(`You have not set a parking capacity, kindly set parking capacity\n`);
                    askUserInputInTerminal();
                }
                break;
                //remove a car from parking using slot number
            case `3`:
                if (!!parking) {
                    prompts.question(`Please enter car slot number :\n`, (slot) => {
                        //array starts from 0 so if user wants to remove car from 1 it would mean 0th position
                        console.log(parking.removeACar(parseInt(slot - 1)));
                        askUserInputInTerminal();
                    });
                } else {
                    console.log(`You have not set a parking capacity, kindly set parking capacity\n`);
                    askUserInputInTerminal();
                }
                break;
                //find car by colors or group by colors
            case `4`:
                if (!!parking) {
                    prompts.question(`Please enter car color to find matching cars :\n`, (color) => {
                        console.log(parking.getCarsByColor(color));
                        askUserInputInTerminal();
                    });
                } else {
                    console.log(`You have not set a parking capacity, kindly set parking capacity\n`);
                    askUserInputInTerminal();
                }
                break;
                //find slots using color
            case `5`:
                if (!!parking) {
                    prompts.question(`Please enter car color to find slots :\n`, (color) => {
                        console.log(parking.getSlotsByColor(color));
                        askUserInputInTerminal();
                    });
                } else {
                    console.log(`You have not set a parking capacity, kindly set parking capacity\n`);
                    askUserInputInTerminal();
                }
                break;
                //find using registration number
            case `6`:
                if (!!parking) {
                    prompts.question(`Please enter car registration number for slot :\n`, (regNum) => {
                        console.log(parking.getSlotByRegistrationNumber(regNum));
                        askUserInputInTerminal();
                    });
                } else {
                    console.log(`You have not set a parking capacity, kindly set parking capacity\n`);
                    askUserInputInTerminal();
                }
                break;
            case `7`:
                console.log(`I hope you know what are you doing`);
                prompts.question(`Please enter Y/N :\n`, (resetDecision) => {
                    if (resetDecision.toLowerCase() === `y`) {
                        parking = null;
                        console.log(`App is reset\n`);
                    }
                    askUserInputInTerminal();
                });
                break;
                //problem with input prompt menu again
            default:
                console.log(`Invalid Input, please try again`);
                askUserInputInTerminal();
                break;
        }
        return;
    }

    const app = express();
    module.exports = app;