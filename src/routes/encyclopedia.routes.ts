import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const PLANT_API_BASE_URL = "https://trefle.io/api/v1/plants";
const PLANT_API_TOKEN = process.env.PLANT_API_TOKEN;

// Fetch Plant Information
router.get("/:query", async (req: Request, res: Response) => {
  const { query } = req.params;

  try {
    const response = await axios.get(PLANT_API_BASE_URL, {
      params: { q: query, token: PLANT_API_TOKEN },
    });

    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch plant information" });
  }
});

export default router;
