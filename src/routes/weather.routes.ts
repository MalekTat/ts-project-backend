import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetch Weather Data
router.get("/", async (req: Request, res: Response) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location query parameter is required" });
  }

  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });

    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch weather data" });
  }
});

export default router;
