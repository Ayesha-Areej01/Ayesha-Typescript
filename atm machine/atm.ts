import * as readlineSync from 'readline-sync';
import chalk from 'chalk';
class ATM {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  checkBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited: ${amount}`);
      this.displayBalance();
    } else {
      console.log(chalk.red("Invalid deposit amount."));
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrawn: ${amount}`);
      this.displayBalance();
    } else {
      console.log(chalk.bgRedBright("Invalid withdrawal amount or insufficient funds."));
    }
  }

  displayBalance(): void {
    console.log(`Current Balance: ${this.balance}`);
  }
}

// Example usage with user input
const initialBalance = parseFloat(readlineSync.question((chalk.bold("Enter initial balance: "))));
const atm = new ATM(initialBalance);

while (true) {
  console.log("\n1. Check Balance");
  console.log("2. Deposit");
  console.log("3. Withdraw");
  console.log("4. Exit");

  const choice = parseInt(readlineSync.question(chalk.green("Enter your choice(1-4): ")));

  switch (choice) {
    case 1:
      console.log("\nChecking balance:");
      atm.displayBalance();
      break;

    case 2:
      const depositAmount = parseFloat(readlineSync.question(chalk.italic("Enter deposit amount: ")));
      atm.deposit(depositAmount);
      break;

    case 3:
      const withdrawAmount = parseFloat(readlineSync.question(chalk.italic("Enter withdrawal amount: ")));
      atm.withdraw(withdrawAmount);
      break;

    case 4:
      console.log(chalk.dim("Thank you for using our ATM!"));
      process.exit(0);

    default:
      console.log(chalk.redBright("Invalid choice. Please enter a valid option."));
  }
}
