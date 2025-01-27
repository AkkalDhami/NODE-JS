
import https from 'https';
import chalk from 'chalk';

const getJoke = () => {
    const url = `https://official-joke-api.appspot.com/random_joke`;
    https.get(url, (res) => {
        res.on('data', (data) => {
            const joke = JSON.parse(data);
            console.log(`Dad: ${chalk.yellow(joke.setup)}`,);
            console.log(`Son: ${chalk.green(joke.punchline)}`);
        });
        res.on('end', () => {
            console.log(chalk.red('End of Joke!!'));
        });
        res.on('error', (err) => {
            console.log(chalk.red(err));
        });
    });
}

getJoke();