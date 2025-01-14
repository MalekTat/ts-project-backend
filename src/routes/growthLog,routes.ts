
import express, { Request, Response } from 'express';
import prisma from '../db';
import { RequestGrowthLog } from '../types'; 
import  upload  from '../services/cloudinary.services';

const router = express.Router();

// Get All Growth Logs
router.get("/", async (req: Request, res: Response) => {
  try {
    const logs = await prisma.growthTracking.findMany();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch growth logs" });
  }
});


// Get all Growth Logs for a specific plant
router.get('/plant/:plantId', async (req: Request, res: Response): Promise<any> => {
  try {
    const plantId = parseInt(req.params.plantId, 10);

    if (isNaN(plantId)) {
      return res.status(400).json({ error: 'Invalid plantId' });
    }

    const growthLogs = await prisma.growthTracking.findMany({
      where: { plantId },
    });

    res.json(growthLogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch growth logs' });
  }
});


// Add Growth Log (with Cloudinary image upload)
router.post("/", upload.single("imageUrl"), async (req: RequestGrowthLog, res: Response): Promise<any> => {
  try {
    const { plantId, date, height, notes } = req.body;
    const imageUrl = req.file?.path || 'https://res.cloudinary.com/dhvyrgmrq/image/upload/v1734197098/iqeyw6qdpum2w0ecqkcm.png';

    // Validate and convert plantId to an integer
    const plantIdInt = parseInt(plantId, 10);
    if (isNaN(plantIdInt)) {
      return res.status(400).json({ error: "Invalid plant ID" });
    }

    // Validate and convert date to a Date object
    const trackedAt = new Date(date);
    if (isNaN(trackedAt.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Validate and convert height to a float (if provided)
    const heightFloat = height ? parseFloat(height) : null;
    if (height && isNaN(heightFloat)) {
      return res.status(400).json({ error: "Invalid height value" });
    }

    // Create a new growth log
    const newGrowthLog = await prisma.growthTracking.create({
      data: {
        plantId: plantIdInt,
        trackedAt,
        height: heightFloat,
        notes,
        imageUrl,
      },
    });

    res.status(201).json(newGrowthLog);
  } catch (error) {
    console.error("Error creating growth log:", error);
    res.status(500).json({ error: "Failed to create growth log" });
  }
});




// Get Growth Log by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const log = await prisma.growthTracking.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch growth log" });
  }
});




// Update Growth Log
router.put("/:id", upload.single("imageUrl"), async (req: RequestGrowthLog, res: Response): Promise<any> => {
  try {
    const { plantId, date, height, notes } = req.body;
    const imageUrl = req.file?.path; // Get the image URL from Cloudinary if uploaded

    // Validate and parse ID
    const logId = parseInt(req.params.id, 10);
    if (isNaN(logId)) {
      return res.status(400).json({ error: "Invalid growth log ID" });
    }

    // Validate and convert plantId to an integer (if provided)
    const plantIdInt = plantId ? parseInt(plantId, 10) : undefined;
    if (plantId && isNaN(plantIdInt)) {
      return res.status(400).json({ error: "Invalid plant ID" });
    }

    // Validate and convert date to a Date object (if provided)
    const trackedAt = date ? new Date(date) : undefined;
    if (date && isNaN(trackedAt?.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Validate and convert height to a float (if provided)
    const heightFloat = height ? parseFloat(height) : undefined;
    if (height && isNaN(heightFloat)) {
      return res.status(400).json({ error: "Invalid height value" });
    }

    // Construct the update data object
    const updateData: any = {
      ...(plantIdInt && { plantId: plantIdInt }),
      ...(trackedAt && { trackedAt }),
      ...(heightFloat && { height: heightFloat }),
      ...(notes && { notes }),
    };

    // Include imageUrl only if a new image is uploaded
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    // Update growth log in the database
    const updatedLog = await prisma.growthTracking.update({
      where: { id: logId },
      data: updateData,
    });

    res.json(updatedLog);
  } catch (error) {
    console.error("Error updating growth log:", error);
    res.status(500).json({ error: "Failed to update growth log" });
  }
});




// Delete Growth Log
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.growthTracking.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete growth log" });
  }
});


module.exports = router;
