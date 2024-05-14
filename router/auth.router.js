import express from "express";

import { authenticateToken } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();
const controller = new AuthController();

router.post("/register", validate(RegisterSchema), controller.register);
router.post("/login", validate(LoginSchema), controller.login);
router.get("/profile", authenticateToken, controller.profile);
router.put("/upgrade-admin", authenticateToken, controller.upgradeRoleAdmin);

export default router;
