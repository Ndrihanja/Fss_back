import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NiveauSchema = new Schema({
  dossier_principal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DossierPrincipal",
    required: true,
  },
  etape: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etape",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});


export default mongoose.model("Niveau", NiveauSchema);
