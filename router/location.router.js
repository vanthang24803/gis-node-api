import express from "express";
import { LocationController } from "../controllers/location.controller.js";
import validate from "../middleware/validate.js";
import { LocationSchema, UpdateLocation } from "../schemas/location.schema.js";

const router = express.Router();
const controller = new LocationController();

router.post("/", validate(LocationSchema), controller.createLocation);
router.get("/", controller.getAllLocation);
router.get("/:id", controller.getDetailLocation);
router.put("/:id", validate(UpdateLocation), controller.updateLocation);
router.delete("/:id", controller.deleteLocation);

export default router;
