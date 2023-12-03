#!usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';

import input from 'inquirer/lib/prompts/input.js';
import number from 'inquirer/lib/prompts/number.js';

export async function game(){

var que = await inquirer.prompt([
    {
        name:"guess",
        type:"number",
        Message:chalk.greenBright("Write a number between 1-10"),
        validate: (answers: input)=>{
            if (Number.isNaN(number)){
                return chalk.bgRedBright('Enter a Number!!');
            }
            return true;
        },
    },
])
return que.guess
};

game();


