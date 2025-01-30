import readline from 'readline/promises';
const API_KEY = '27cfc8d0c4b8df5f08069ec450b5cff7'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const getWeather = async (city) => {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    return data;
}

const main = async () => {
    const city = await rl.question("Enter the city name: ");
    try {
        const weather = await getWeather(city);
        console.log(`Weather in ${city}:`);
        console.log(`Temperature: ${weather.main.temp}°C`);
        console.log(`Humidity: ${weather.main.humidity}%`);
        console.log(`Wind Speed: ${weather.wind.speed} m/s`);
        console.log(`Condition: ${weather.weather[0].description}`);
        console.log("Exiting...");
        rl.close();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        console.log("Exiting...");
        rl.close();
    }
}

main();
