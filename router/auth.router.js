import express from "express";
import {
  login,
  profile,
  register,
  upgradeRoleAdmin,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/index.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, profile);
router.put("/upgrade-admin", authenticateToken, upgradeRoleAdmin);

export default router;
