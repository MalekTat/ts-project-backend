import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();
const OPENFARM_API_URL = "https://openfarm.cc/api/v1/crops";


// Fetch Plant Information
router.get("/:query", async (req: Request, res: Response) => {
  const { query } = req.params;

  try {
    // Fetch data from OpenFarm API
    const response = await axios.get(OPENFARM_API_URL, {
      params: { filter: query },
    });

    // Extract and format the data
    const plants = response.data.data.map((plant: any) => ({
      name: plant.attributes.name,
      description: plant.attributes.description,
      sunlight: plant.attributes.sun_requirements || "Unknown",
      imageUrl: plant.attributes.main_image_path || "",
    }));

    res.json(plants); 
  } catch (error: any) {
    console.error("Error fetching plant data from OpenFarm:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch plant information" });
  }
});

module.exports = router;