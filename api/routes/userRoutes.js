import express from "express";
import { getUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// Define a route for getting all users
router.get("/get", getUsers);
router.get("/get/:id", getUser);

export default router;
