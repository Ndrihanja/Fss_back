import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
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
  roles: [String],
  dossier_principal: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DossierPrincipal",
    },
  ],
});

export default mongoose.model("Client", clientSchema);
