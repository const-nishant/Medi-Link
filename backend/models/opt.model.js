import mongoose from "mongoose";

const optSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  otp: {
    type: String,
    trim: true,
  },
});

const Opt = mongoose.model("Opt", optSchema);
export default Opt;
