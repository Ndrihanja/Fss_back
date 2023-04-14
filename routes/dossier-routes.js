import express from "express";
import {
  createDossier,
  deleteDossier,
  getAllDossier,
  getAllDossierForAgent,
  getDossierBy,
  updateDossier,
} from "../controller/dossier-principal-controller";

const router = express.Router();

router.get("/", getAllDossier);
router.get("/:id", getDossierBy);
router.get("/all/:id", getAllDossierForAgent);
router.post("/create-dossier", createDossier);
router.post("/update-dossier/:id", updateDossier);
router.delete("/delete-dossier/:id", deleteDossier);

export default router;
