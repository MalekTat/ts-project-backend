
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json("All good in here");
});

module.exports = router;
