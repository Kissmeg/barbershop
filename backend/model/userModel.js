import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true }, // Formatiran datum na srpskom (DD.MM.YYYY.)
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("tolmacClients", userSchema)