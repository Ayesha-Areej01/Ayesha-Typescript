#! /usr/bin/env node
import chalkAnimation from 'chalk-animation';
chalkAnimation.rainbow('Lets calculate');
import chalk from "chalk";
import inquirer from "inquirer";
import { add } from './operations/addition.js';
import { subtract } from './operations/subtraction.js';
import { multiply } from './operations/multiplication.js';
import { divide } from './operations/division.js';
const operation = await inquirer.prompt([
    {
        type: 'list',
        name: 'operation',
        message: 'Select an operation:',
        choices: ["Addition", "Subtraction", "Multiplication", "Division"]
    },
]);
const num1 = await inquirer.prompt({
    type: 'number',
    name: 'num1',
    message: 'Enter the first number:',
});
const num2 = await inquirer.prompt({
    type: 'number',
    name: 'num2',
    message: 'Enter the second number:',
});
let result;
switch (operation.operation) {
    case 'Addition':
        result = add(num1.num1, num2.num2);
        break;
    case 'Subtraction':
        result = subtract(num1.num1, num2.num2);
        break;
    case 'Multiplication':
        result = multiply(num1.num1, num2.num2);
        break;
    case 'Division':
        result = divide(num1.num1, num2.num2);
        break;
}
console.log(chalk.greenBright.bold(`Result: ${result}`));
