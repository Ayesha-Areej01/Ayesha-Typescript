#!usr/bin/env node

import { game} from "./userinput.js";

import inquirer from "inquirer";
import chalk from "chalk";
let pS=0
export function guess(rn:number, un:number){
    if (un === rn)
    {
    console.log(chalk.greenBright('Brilliant!You guessed it correct'));
    return true
    pS++;
    }
    else if (un > rn)
    {
    console.log(chalk.bgRed(`Oops! Your guess ${un} is Greater than actual number`));
    return false
    pS=0
    }
    else if (un < rn)
    {
    console.log(chalk.red(`Oops! Your guess ${un} is Less than actual number`));
    return false
    pS=0
    }
}