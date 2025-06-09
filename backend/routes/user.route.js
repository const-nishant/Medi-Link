import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import checkIsPatient from "../middlewares/checkispatient.middleware.js";
import {
  deleteUser,
  getDoctor,
  getDoctors,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/doctors", authorize, checkIsPatient, getDoctors);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", authorize, updateUser);

userRouter.delete("/:id", authorize, deleteUser);

userRouter.get("/doctors/:id", authorize, getDoctor);

export default userRouter;
