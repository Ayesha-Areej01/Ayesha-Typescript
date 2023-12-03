#!usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from "chalk-animation";
import { game } from "./num-guess-game/userinput.js";
import { guess } from "./num-guess-game/result.js";
import { restart } from "./num-guess-game/match-number.js";
let playerScore = 0;
const sleep = () => new Promise((res, rej) => setTimeout(res, 2000));
async function welcome() {
    const neon = chalkAnimation.neon(`Let's start !!!`);
    await sleep();
    neon.stop();
}
await welcome();
let maxchances = 3;
let randomNumber = Math.floor(Math.random() * 10 + 1);
let again = 'Y';
do {
    for (let i = 0; i < 3; i++) {
        let userguess = await game();
        let result = guess(randomNumber, userguess);
        if (result === true) {
            playerScore++;
            again = await restart();
        }
        else {
            console.log(chalk.black `(You have${i}chances left)`);
        }
        // console.log(result);
    }
} while (again == 'y' || again == 'Y' || again == 'yes' || again == 'YES');
