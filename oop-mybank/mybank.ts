#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';

class Customer {
  private firstName: string;
  private lastName: string;
  private gender: string;
  private age: number;
  private mobileNumber: string;
  private accountBalance: number;

  constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: string, initialCredit: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.accountBalance = initialCredit;
  }

  getCustomerInfo(): string {
    return `Name: ${this.firstName} ${this.lastName}
Age: ${this.age}
Gender: ${this.gender}
Mobile: ${this.mobileNumber}
Account Balance: ${this.accountBalance}`;
  }
}

function loadCustomerData(): Customer[] {
  try {
    const data = fs.readFileSync('customers.json', 'utf-8');
    return JSON.parse(data) as Customer[];
  } catch (error) {
    return [];
  }
}

function saveCustomerData(customers: Customer[]): void {
  try {
    const data = JSON.stringify(customers, null, 2);
    fs.writeFileSync('customers.json', data);
    console.log('Customer data saved to customers.json');
  } catch (error) {
    console.error('Failed to save customer data:', (error as Error).message);
  }
}

async function enrollCustomer(): Promise<void> {
  try {
    const customerDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter first name:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter last name:',
      },
      {
        type: 'input',
        name: 'gender',
        message: 'Enter gender:',
      },
      {
        type: 'input',
        name: 'age',
        message: 'Enter age:',
      },
      {
        type: 'input',
        name: 'mobileNumber',
        message: 'Enter mobile number:',
      },
      {
        type: 'input',
        name: 'initialCredit',
        message: 'Enter initial credit amount:',
      },
    ]);

    const customer = new Customer(
      customerDetails.firstName,
      customerDetails.lastName,
      customerDetails.gender,
      parseInt(customerDetails.age),
      customerDetails.mobileNumber,
      parseFloat(customerDetails.initialCredit)
    );

    console.log(customer.getCustomerInfo());

    const existingData = loadCustomerData();
    existingData.push(customer);

    saveCustomerData(existingData);
  } catch (error: any) {
    console.error('Error during customer enrollment:', (error as Error).message);
  }
}

async function main(): Promise<void> {
  await enrollCustomer();
}

main();
