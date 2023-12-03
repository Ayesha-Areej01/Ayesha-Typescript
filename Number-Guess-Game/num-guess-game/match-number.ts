#!usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
/*
export async function startAgain(){
    var restart= await inquirer.prompt([

    
        type: "input",
        name: "restart",
        message: chalk.bgCyanBright("Would you give it another try? Hit Y or N")
    ])
        }*/

        export async function restart() {
            const restart = await inquirer.prompt([
                {
                    type: "input",
                    name: "startAgain",
                    message: chalk.italic("Do you want to play again? Hit Y or N")
                }
            ]);
            return restart.startAgain
        }        
