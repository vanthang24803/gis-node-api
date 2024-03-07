import express from "express";
import categoryRouter from "./category.router.js";
import locationRouter from "./location.router.js";
import uploadRouter from "./image.router.js";

const router = express.Router();

router.use("/category", categoryRouter);
router.use("/location", locationRouter);
router.use("/upload", uploadRouter);
export default router;
