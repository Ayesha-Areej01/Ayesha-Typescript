
import * as readlineSync from 'readline-sync';

class CountdownTimer {
  private targetDate: Date;
  private intervalId: NodeJS.Timeout | null;

  constructor(targetDate: Date) {
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  start(): void {
    this.update(); 

    this.intervalId = setInterval(() => {
      this.update();
    }, 1000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private update(): void {
    const currentDate = new Date();
    const timeDifference = this.targetDate.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      this.stop();
      console.log('Countdown timer expired! Time has reached.');
    } else {
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      console.log(
        `Time remaining: ${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
      );
    }
  }
}

const targetDateString = readlineSync.question('Enter the target date (YYYY-MM-DD HH:mm:ss): ');
const targetDate = new Date(targetDateString);

const timer = new CountdownTimer(targetDate);

timer.start();

