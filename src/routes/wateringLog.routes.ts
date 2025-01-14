import express, { Request, Response } from "express";
import prisma from "../db";
import { RequestWateringLog } from "../types";

const router = express.Router();

// Get All Watering Logs
router.get("/", async (req: Request, res: Response) => {
  try {
    const logs = await prisma.wateringLog.findMany({ include: { plant: true}});
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watering logs" });
  }
});


// Get All Watering Logs for a Specific Plant by Plant ID
router.get("/plant/:plantId", async (req: Request, res: Response) => {
  const { plantId } = req.params;

  try {
    const logs = await prisma.wateringLog.findMany({
      where: { plantId: parseInt(plantId) },
      include: { plant: true}
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watering logs for this plant" });
  }
});


// Add Watering Log
router.post("/", async (req: RequestWateringLog, res: Response) => {
  try {

    const { plantId, date, notes } = req.body;

    const newLog = await prisma.wateringLog.create({
      data: {
        plantId: parseInt(plantId), 
        wateredAt: new Date(date),   
        notes,
      },
    });

    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create watering log" });
  }
});

// Get Watering Log by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const log = await prisma.wateringLog.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { plant: true}
    });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watering log" });
  }
});

// Update Watering Log
router.put("/:id", async (req: RequestWateringLog, res: Response) => {
  try {
    const { date, notes } = req.body;

    const updatedLog = await prisma.wateringLog.update({
      where: { id: parseInt(req.params.id) },
      data: {
        wateredAt: new Date(date), 
        notes,
      },
    });

    res.json(updatedLog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update watering log" });
  }
});

// Delete Watering Log
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.wateringLog.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete watering log" });
  }
});


module.exports = router;
