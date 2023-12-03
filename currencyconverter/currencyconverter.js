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
const readline = __importStar(require("readline"));
class CurrencyConverter {
    constructor(exchangeRates) {
        this.exchangeRates = exchangeRates;
    }
    convert(amount, fromCurrency, toCurrency) {
        if (!this.exchangeRates.hasOwnProperty(fromCurrency) || !this.exchangeRates.hasOwnProperty(toCurrency)) {
            throw new CurrencyConversionError(`Invalid currency code: ${fromCurrency} or ${toCurrency}`);
        }
        const fromRate = this.exchangeRates[fromCurrency];
        const toRate = this.exchangeRates[toCurrency];
        return amount * (toRate / fromRate);
    }
}
class CurrencyConversionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CurrencyConversionError';
    }
}
const exchangeRates = {
    USD: 1.00,
    EUR: 0.92,
    PKR: 230.00,
    GBP: 0.82,
    CHF: 0.90,
};
const pkrToUsdRate = 1 / exchangeRates['PKR'];
const pkrToEurRate = pkrToUsdRate * exchangeRates['EUR'];
const pkrToGbpRate = pkrToUsdRate * exchangeRates['GBP'];
const pkrToChfRate = pkrToUsdRate * exchangeRates['CHF'];
console.log(`PKR to USD exchange rate: ${pkrToUsdRate}`);
console.log(`PKR to EUR exchange rate: ${pkrToEurRate}`);
console.log(`PKR to GBP exchange rate: ${pkrToGbpRate}`);
console.log(`PKR to CHF exchange rate: ${pkrToChfRate}`);
const converter = new CurrencyConverter(exchangeRates);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Enter the amount to convert: ', (amountInput) => {
    const amount = parseFloat(amountInput);
    if (isNaN(amount)) {
        console.error('Invalid input for amount. Please enter a valid number.');
        rl.close();
        return;
    }
    rl.question('Enter the source currency: ', (fromCurrency) => {
        rl.question('Enter the target currency: ', (toCurrency) => {
            try {
                const convertedAmount = converter.convert(amount, fromCurrency, toCurrency);
                console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
            }
            catch (error) {
                if (error instanceof CurrencyConversionError) {
                    console.error(error.message);
                }
                else {
                    console.error('An unexpected error occurred.');
                }
            }
            rl.close();
        });
    });
});
