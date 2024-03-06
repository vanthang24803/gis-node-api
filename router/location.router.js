import express from "express";
import { createLocation, getAllLocation } from "../controllers/location.controller.js";

const router = express.Router();

router.post("/", createLocation);
router.get("/" , getAllLocation);

export default router;
