import express from "express";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  getDetailLocation,
  updateLocation,
} from "../controllers/location.controller.js";
import validate from "../middleware/validate.js";
import { LocationSchema, UpdateLocation } from "../schemas/location.schema.js";

const router = express.Router();

router.post("/", validate(LocationSchema), createLocation);
router.get("/", getAllLocation);
router.get("/:id", getDetailLocation);
router.put("/:id", validate(UpdateLocation), updateLocation);
router.delete("/:id", deleteLocation);

export default router;
