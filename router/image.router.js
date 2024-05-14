import express from "express";
import { PhotoController } from "../controllers/image.controller.js";
import upload from "../utils/upload.js";

const router = express.Router();
const controller = new PhotoController();

router.post("/:id", upload.array("files", 10), controller.uploadImage);
router.delete("/:locationId/image/:id", controller.deleteImage);

export default router;
