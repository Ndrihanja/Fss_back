import express from "express";
import {
  getCountAgent,
  getCountClient,
  getCountDossier,
  getCountDossierByEtape,
} from "../controller/dash-controller";

const router = express.Router();

router.get("/count-agent", getCountAgent);
router.get("/count-client", getCountClient);
router.get("/count-dossier", getCountDossier);
router.get("/count-dossier-etape/:etape", getCountDossierByEtape);

export default router;
