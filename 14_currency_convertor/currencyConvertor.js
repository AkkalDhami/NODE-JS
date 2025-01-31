import https from 'https';
import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const apiKey = '1eeccfb59edc61c8c944107e';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const convertCurrency = (amount, rate) => {
    return (amount * rate).toFixed(2);
}

https.get(url, (response) => {
    let data = "";
    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        const rates = JSON.parse(data).conversion_rates;
        console.log(rates);
        rl.question(chalk.blue('Enter the amount in USD: '), (amount) => {
            rl.question(chalk.magenta("Enter the target currency: "), (currency) => {
                const rate = rates[currency.toUpperCase()];
                if (rate) {
                    console.log(chalk.greenBright(`${amount} USD is approximately ${convertCurrency(amount, rate)} ${currency}`))
                } else {
                    console.log(chalk.red('Invalid Currrency Code!!'));
                }
                rl.close();
            });
        });
    });
})