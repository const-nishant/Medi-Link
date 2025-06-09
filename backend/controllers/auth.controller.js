import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User, { Doctor } from "../models/user.model.js";
import bcrypt from "bcrypt";
import Opt from "../models/opt.model.js";
import { sendMail } from "../sendmail.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, role, profile } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    let newUser;
    if (role === "patient") {
      newUser = await Doctor.create({
        name,
        email,
        password: hashedPassword,
        isEmailVerified: false,
        role,
        profile,
      });
    } else if (role === "doctor") {
      newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        isEmailVerified: false,
        role,
        profile,
      });
    }

    //create JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
        email: newUser.email,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token: token,
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    //create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token: token,
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const emailVerificationRequest = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.userEmail,
      role: req.userRole,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const otpDoc = await Opt.findOneAndUpdate(
      {
        email: req.userEmail,
      },
      {
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    await sendMail(
      req.userEmail,
      "MediLink: OTP for email verification",
      "Your OTP is " + otpDoc.otp
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const emailVerificationSubmit = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.userEmail,
      role: req.userRole,
    });
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }
    const otpDoc = await Opt.findOne({
      email: req.userEmail,
    });

    if (!otpDoc || otpDoc.otp !== req.body.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Update user email verification status
    user.isEmailVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};
