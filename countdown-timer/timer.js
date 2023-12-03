"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// countdown-timer.ts
const readlineSync = __importStar(require("readline-sync"));
class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = targetDate;
        this.intervalId = null;
    }
    start() {
        this.update(); // Update immediately to show the initial state
        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    update() {
        const currentDate = new Date();
        const timeDifference = this.targetDate.getTime() - currentDate.getTime();
        if (timeDifference <= 0) {
            this.stop();
            console.log('Countdown timer expired! Time has reached.');
        }
        else {
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            console.log(`Time remaining: ${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`);
        }
    }
}
// Take user input for the target date
const targetDateString = readlineSync.question('Enter the target date (YYYY-MM-DD HH:mm:ss): ');
const targetDate = new Date(targetDateString);
// Example usage:
const timer = new CountdownTimer(targetDate);
timer.start();
