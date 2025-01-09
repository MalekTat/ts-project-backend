// const router = require("express").Router();

// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

// module.exports = router;



import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json("All good in here");
});

//export default router;
module.exports = router
