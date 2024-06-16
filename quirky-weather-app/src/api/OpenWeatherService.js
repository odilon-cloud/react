const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'e13517617020b4f8a973864626559f7e';

const GEO_API_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'a936af212emsh99f787cbb3463dfp123b06jsn88e75d153e09',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    },
};

export async function fetchWeatherData(lat, lon) {
    try {
        let [weatherPromise, forcastPromise] = await Promise.all([
            fetch(
                `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            ),
            fetch(
                `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            ),
        ]);

        const weatherResponse = await weatherPromise.json();
        const forcastResponse = await forcastPromise.json();
        return [weatherResponse, forcastResponse];
    } catch (error) {
        console.log(error);
    }
}

export async function fetchCities(input) {
    try {
        const response = await fetch(
            `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
            GEO_API_OPTIONS
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
}