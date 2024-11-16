import axios from 'axios';

const API_KEY: string = "d514bf17aa3c17a15ab3bff0dc55ab1d";

const fetchWeatherData = async (city: string) => {
    try {
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
        const response = await axios.get(baseURL, {
            params: {
                q: city, 
                units: 'metric', 
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error fetching weather data';
        throw new Error(errorMessage);
    }
};

export { fetchWeatherData };
