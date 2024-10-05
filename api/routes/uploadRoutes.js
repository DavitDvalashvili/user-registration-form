import express from "express";

import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/uploadImage", uploadImage);

export default router;
