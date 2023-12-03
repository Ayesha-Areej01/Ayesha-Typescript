#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    accountBalance;
    constructor(firstName, lastName, gender, age, mobileNumber, initialCredit) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.accountBalance = initialCredit;
    }
    getCustomerInfo() {
        return `Name: ${this.firstName} ${this.lastName}
Age: ${this.age}
Gender: ${this.gender}
Mobile: ${this.mobileNumber}
Account Balance: ${this.accountBalance}`;
    }
}
function loadCustomerData() {
    try {
        const data = fs.readFileSync('customers.json', 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
}
function saveCustomerData(customers) {
    try {
        const data = JSON.stringify(customers, null, 2);
        fs.writeFileSync('customers.json', data);
        console.log('Customer data saved to customers.json');
    }
    catch (error) {
        console.error('Failed to save customer data:', error.message);
    }
}
async function enrollCustomer() {
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
        const customer = new Customer(customerDetails.firstName, customerDetails.lastName, customerDetails.gender, parseInt(customerDetails.age), customerDetails.mobileNumber, parseFloat(customerDetails.initialCredit));
        console.log(customer.getCustomerInfo());
        const existingData = loadCustomerData();
        existingData.push(customer);
        saveCustomerData(existingData);
    }
    catch (error) {
        console.error('Error during customer enrollment:', error.message);
    }
}
async function main() {
    await enrollCustomer();
}
main();
