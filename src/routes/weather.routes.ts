import express, { Request, Response } from "express";
import { WeatherData } from '../types'; 
import axios from "axios";

const router = express.Router();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetch Weather Data
router.get("/", async (req: Request, res: Response): Promise<any> => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location query parameter is required" });
  }

  try {
    // Fetch weather data from OpenWeather API
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        q: location ,
        appid: WEATHER_API_KEY,
        units: "metric", // Return temperature in Celsius
      },
    });

    // Format the response to match the WeatherData interface
    const weatherData: WeatherData = {
      temperature: `${response.data.main.temp}°C`,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    };

    res.json(weatherData);
  } catch (error: any) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch weather data" });
  }
});

//export default router;
module.exports = router