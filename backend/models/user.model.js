import mongoose from "mongoose";
import Opt from "./opt.model.js";

const profileSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    specilization: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: profileSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1, role: 1 });
userSchema.post("", function (doc) {
  return Opt.create({
    email: doc.email,
    otp: null,
  });
});
userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Opt.deleteOne({ email: doc.email });
  }
});

const User = mongoose.model("User", userSchema);
export default User;
