import express from "express";
import { getUser, getUsers, addUser } from "../controllers/userController.js";

const router = express.Router();

// Define a route for getting all users
router.get("/get", getUsers);
router.get("/get/:id", getUser);
router.post("/add", addUser);

export default router;
