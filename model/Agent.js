import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AgentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  task_number: {
    type: Number,
    required: false,
  },
  roles: [String],
  dossier_principal: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DossierPrincipal" },
  ],
});

export default mongoose.model("Agent", AgentSchema);
