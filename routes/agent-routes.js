import express from "express";
import {
  createAgent,
  getAllAgent,
  login,
  updateAgent,
} from "../controller/agent-controller";

const router = express.Router();

router.get("/", getAllAgent);
router.post("/create-agent", createAgent);
router.patch("/update-agent/:id", updateAgent);
router.post("/login", login);

export default router;
