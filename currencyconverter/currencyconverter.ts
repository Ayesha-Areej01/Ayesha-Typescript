import * as readline from 'readline';


interface ExchangeRate {
  [currencyCode: string]: number;
}

class CurrencyConverter {
  private exchangeRates: ExchangeRate;

  constructor(exchangeRates: ExchangeRate) {
    this.exchangeRates = exchangeRates;
  }

  public convert(amount: number, fromCurrency: string, toCurrency: string): number {
    if (!this.exchangeRates.hasOwnProperty(fromCurrency) || !this.exchangeRates.hasOwnProperty(toCurrency)) {
      throw new CurrencyConversionError(`Invalid currency code: ${fromCurrency} or ${toCurrency}`);
    }
    const fromRate = this.exchangeRates[fromCurrency];
    const toRate = this.exchangeRates[toCurrency];

    return amount * (toRate / fromRate);
  }
}

class CurrencyConversionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CurrencyConversionError';
  }
}

const exchangeRates: ExchangeRate = {
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
      } catch (error) {
        if (error instanceof CurrencyConversionError) {
          console.error(error.message);
        } else {
          console.error('An unexpected error occurred.');
        }
      }
      rl.close();
    });
  });
});
