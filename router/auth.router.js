import express from "express";
import {
  login,
  profile,
  register,
  upgradeRoleAdmin,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.get("/profile", authenticateToken, profile);
router.put("/upgrade-admin", authenticateToken, upgradeRoleAdmin);

export default router;
