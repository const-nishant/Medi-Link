import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

authRouter.post("/forgot-password", (req, res) => {
  res.send("Password reset link sent to your email");
});

authRouter.post("/email-verification/request", (req, res) => {
  res.send("Email verification link sent to your email");
});

authRouter.post("/email-verification/submit", (req, res) => {
  res.send("Email verified successfully");
});

export default authRouter;
