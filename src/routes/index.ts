import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("WELCOME TO ADEYINKA MY REACT NATIVE API");
});
export default router;
