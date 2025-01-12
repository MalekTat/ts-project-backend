import  express, { Request, Response } from "express";
import  prisma  from "../db";
import { RequestPlant } from "../types";
import {fetchPlantDetails } from "../services/encyclopedia.services";

const router = express.Router();


// Get All Plants
router.get("/", async (req: Request, res: Response) => {
  try {
    const plants = await prisma.plant.findMany();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});



// Add Plant
router.post("/", async (req: RequestPlant, res: Response) => {
    try {
      const { name, waterFrequency, notes } = req.body ;
  
      // Fetch plant details from OpenFarm API
      const plantDetails = await fetchPlantDetails(name);

  
      if (!plantDetails) {
        return res.status(400).json({ error: "Failed to fetch plant details from Encyclopedia API" });
      }
  
      const newPlant = await prisma.plant.create({
        data: {
          name: plantDetails.name,
          waterFrequency : parseInt(waterFrequency), // Convert string to number,
          sunlight: plantDetails.sunlight,
          notes,
          imageUrl: plantDetails.imageUrl,
        },
      });
  
      res.status(201).json(newPlant);
    } catch (error) {
      res.status(500).json({ error: "Failed to create plant" });
    }
  });



// Get Plant by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const plant = await prisma.plant.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: { wateringLogs: true, growthLogs: true },
    });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plant" });
  }
});



// Update Plant
router.put("/:id", async (req: RequestPlant, res: Response) => {
    try {
      const { name, waterFrequency, notes } = req.body;
  
      // Fetch plant details from OpenFarm API
      const plantDetails = await fetchPlantDetails(name);
  
      if (!plantDetails) {
        return res.status(400).json({ error: "Failed to fetch plant details from Encyclopedia API" });
      }
  
      const updatedPlant = await prisma.plant.update({
        where: { id: parseInt(req.params.id, 10) },
        data: {
          name: plantDetails.name,
          waterFrequency : parseInt(waterFrequency), // Convert string to number,
          sunlight: plantDetails.sunlight,
          notes,
          imageUrl: plantDetails.imageUrl,
        },
      });
  
      res.json(updatedPlant);
    } catch (error) {
      res.status(500).json({ error: "Failed to update plant" });
    }
  });



// Delete Plant
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.plant.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete plant" });
  }
});

//export default router;
module.exports = router
  

