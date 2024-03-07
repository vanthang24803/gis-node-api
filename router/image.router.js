import express from "express";
import { deleteImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../utils/upload.js";
const router = express.Router();

router.post("/:id" , upload.array('files' , 10) ,uploadImage);
router.delete("/:locationId/image/:id" , deleteImage);

export default router;
