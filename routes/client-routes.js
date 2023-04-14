import express from "express";
import { createClient, getAllClient } from "../controller/client-controller";

const router = express.Router();

router.get("/", getAllClient);
router.post("/create-client", createClient);

export default router;