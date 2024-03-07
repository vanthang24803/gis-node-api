import express from "express";
import { createLocation, deleteLocation, getAllLocation, getDetailLocation, updateLocation } from "../controllers/location.controller.js";

const router = express.Router();

router.post("/", createLocation);
router.get("/" , getAllLocation);
router.get("/:id", getDetailLocation);
router.put("/:id" , updateLocation);
router.delete("/:id" , deleteLocation);


export default router;
