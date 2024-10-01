import express from "express";
import { getPositions } from "../controllers/positionController.js";

const router = express.Router();

// Define a route for getting all positions
router.get("/get", getPositions);

export default router;
