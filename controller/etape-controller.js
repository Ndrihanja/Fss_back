import Etape from "../model/Etape";

//mi creer ny dossier
export const createEtape = async (req, res) => {
  try {
    const etape = new Etape(req.body);
    await etape.save();
    res.status(201).json({ message: "L'étape à bien été enregistrer!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//maka ny etape rehetra
export const getAllEtape = async (req, res, next) => {
  let etapes;
  try {
    etapes = await Etape.find();
    return res.status(201).json(etapes);
  } catch (error) {
    console.log(error);
  }
};
