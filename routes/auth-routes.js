import express from "express";
import { authent, authenticateToken, choixRole, login } from "../middleware/auth";

const router = express.Router();

router.post("/login", login);
router.post("/selectRole", choixRole);
router.get("/protected", authenticateToken,authent);

export default router;