import mongoose from "mongoose";

const Schema = mongoose.Schema;
const EtapeSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  number: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("Etape", EtapeSchema);
