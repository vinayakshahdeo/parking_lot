const express = require('express');
const fs = require('fs');
const readLine = require('readline');

const commandLineInputs = process.argv;
//take input from user to detaermine action
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
    choiceString += `Enter your option for input :\n`
    prompts.question(choiceString, function (data) {
        processUserInputs(data);
    });
}

askUserInputInTerminal();
const app = express();
module.exports = app;