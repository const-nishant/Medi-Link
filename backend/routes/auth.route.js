import { Router } from "express";
import {
  emailVerificationRequest,
  emailVerificationSubmit,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

authRouter.post("/forgot-password", (req, res) => {
  res.send("Password reset link sent to your email");
});

authRouter.post(
  "/email-verification/request",
  authorize,
  emailVerificationRequest
);

authRouter.post(
  "/email-verification/submit",
  authorize,
  emailVerificationSubmit
);

export default authRouter;
