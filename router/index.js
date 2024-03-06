import express from "express";
import categoryRouter from "./category.router.js";
import locationRouter from "./location.router.js";

const router = express.Router();

router.use("/category", categoryRouter);
router.use("/location", locationRouter);

export default router;
