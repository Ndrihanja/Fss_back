import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DossierPrincipamSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  produit: {
    type: String,
    required: false,
  },
  nbrcolis: {
    type: Number,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  poid: {
    type: Number,
    require: false,
  },
  origin: {
    type: String,
    required: false,
  },
  destination: {
    type: String,
    required: false,
  },
  nature: {
    type: String,
    required: false,
  },
  taxe: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  prix_traitement: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  facturation: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  numero_enr_douane: {
    type: String,
    required: false,
  },
  date_enr_douane: {
    type: Date,
    required: false,
  },
  agent_terrain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  agent_terrain_name: {
    type: String,
    required: false,
  },
  agent_operant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  agent_operant_name: {
    type: String,
    required: false,
  },
  agent_declarant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  agent_declarant_name: {
    type: String,
    required: false,
  },
  agent_finance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  agent_finance_name: {
    type: String,
    required: false,
  },
  superviseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  superviseur_name: {
    type: String,
    required: false,
  },
  etape: {
    type: Number,
    required: false,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  boxe: {
    type: String,
    required: false,
  },
  emplacement: {
    type: String,
    required: false,
  },
  client_name: {
    type: String,
    required: false,
  },
  niveaux: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Niveau",
    },
  ],
});

export default mongoose.model("DossierPrincipal", DossierPrincipamSchema);
