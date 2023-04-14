import express from "express";
import { createEtape } from "../controller/etape-controller";
const router = express.Router();

router.post("/create-etape", createEtape);
export default router;