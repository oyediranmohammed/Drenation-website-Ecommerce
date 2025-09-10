import express from "express";
import { getAllStates, getLgasByState } from "../controllers/locationController.js";

const router = express.Router();

// Route to get all states
router.get("/states", getAllStates);

// Route to get LGAs for a specific state
router.get("/states/lgas", getLgasByState);

export default router;
