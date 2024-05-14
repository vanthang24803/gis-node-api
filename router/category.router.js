import express from "express";

import { CategoryController } from "../controllers/category.controller.js";

const router = express.Router();
const controller = new CategoryController();

router.get("/", controller.getAllCategory);
router.post("/", controller.createCategory);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

export default router;
