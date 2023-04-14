
import DossierPrincipal from "../model/DossierPrincipal";
import Etape from "../model/Etape";
import Niveau from "../model/Niveau";

//maka ny dossier rehetra
export const getAllDossier = async (req, res, next) => {
  let dossiers;
  try {
    dossiers = await DossierPrincipal.find();
  } catch (error) {
    console.log(error);
  }
  if (!dossiers) {
    return res.status(404).json({ message: "Pas de dossier!" });
  }
  return res.status(200).json({ dossiers });
};


//maka ny dossier par agent
export const getAllDossierForAgent = async (req, res, next) => {
  let etape = req.body.etape;
  const agentId = req.params.id;
  DossierPrincipal.find({
    $or: [
      { agent_terrain: agentId },
      { agent_operant: agentId },
      { agent_declarant: agentId },
      { agent_finance: agentId },
      { superviseur: agentId },
      { client: agentId },
    ],
  })
    .populate("agent_terrain")
    .populate("agent_operant")
    .populate("agent_declarant")
    .populate("agent_finance")
    .populate("superviseur")
    .populate("client")
    .then((dossiers) => {
      return res.json(dossiers);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Erreur serveur");
    });
};

//maka ny dossier par _id dossier
export const getDossierBy = async (req, res, next) => {
  let id = req.params.id;
  let dossier;
  try {
    dossier = await DossierPrincipal.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!dossier) {
    return res.status(404).json({ message: "Pas de dossier!" });
  }
  return res.status(200).json({ dossier });
};

//creation dossier
export const createDossier = async (req, res) => {
  req.body.etape = 1;
  const date = new Date().getUTCDate();
  const etape_ = req.body.etape;
  const nom = req.body.name;
  try {
    const dossier = new DossierPrincipal(req.body);
    await dossier.save();
    const id = await DossierPrincipal.findOne({ name: nom }).select("+_id");
    const dossier_principal = id._id.toString();
    const etp = await Etape.findOne({ number: etape_ }).select("+id");
    const etape = etp._id.toString();
    const niveaux = new Niveau({ dossier_principal, etape, date });
    await niveaux.save();
    console.log("NIVEAU : ", niveaux);
    console.log("Etape : ", etape);
    res.status(201).json({ niveaux });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//update ny dossier isaky ny manao traitement ny agent ray dia mikitika ny dossier
export const updateDossier = async (req, res, next) => {
  console.log(req.body);
  let id = req.params.id;
  let date = new Date().getUTCDate();
  let dossier_principal = id;
  const etape_rec = await DossierPrincipal.findOne({ _id: id }).select(
    "+etape"
  );
  console.log("etana : ", etape_rec);
  const etp_recent = etape_rec.etape + 1;
  req.body.etape = etp_recent;
  const etape = await Etape.findOne({ number: etp_recent });
  try {
    const dossier = await DossierPrincipal.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: false,
    });
    console.log("dossier : ", dossier);
    if (!dossier) {
      return res.status(404).json({ message: "Le dossier n'existe pas!" });
    }
    const niveaux = new Niveau({ dossier_principal, etape, date });
    await niveaux.save();
    res.status(201).json({ dossier });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//supression an'ny  dossier
export const deleteDossier = async (req, res, next) => {
  let id = req.params.id;
  try {
    const dossier = await DossierPrincipal.findByIdAndDelete(id);
    if (!dossier) {
      return res.status(400).json({
        message:
          "L'element n'est pas supprimer en raison de plusieurs problème!",
      });
    }
    res.status(201).json({ message: "Le dossier à bien été supprimer" });
  } catch (error) {
    console.log(error);
  }
};
