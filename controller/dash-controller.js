import Agent from "../model/Agent";
import Client from "../model/Client";
import DossierPrincipal from "../model/DossierPrincipal";

export const getCountAgent = async (req, res, next) => {
  let countAgent;
  try {
    countAgent = await Agent.find().countDocuments();
  } catch (error) {
    return res.status(404).json(" erreur de serveur!");
  }
  return res.status(201).json(countAgent);
};

export const getCountClient = async (req, res, next) => {
  let countClient;
  try {
    countClient = await Client.find().count();
  } catch (error) {
    return res.status(404).json(" erreur de serveur!");
  }

  return res.status(201).json(countClient);
};

export const getCountDossier = async (req, res, next) => {
  let countDossier;
  try {
    countDossier = await DossierPrincipal.find().count();
  } catch (error) {
    return res.status(404).json(" erreur de serveur!");
  }

  return res.status(201).json(countDossier);
};

export const getCountDossierByEtape = async (req, res, next) => {
  let etapes = req.params.etape;
  let countDossierByEtape;
  try {
    countDossierByEtape = await DossierPrincipal.find()
      .where("etape")
      .all([etapes]).countDocuments();
  } catch (error) {
    console.log(error);
    return res.status(404).json(" erreur de serveur!");
  }
  return res.status(201).json(countDossierByEtape);
};
