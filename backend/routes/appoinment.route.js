import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import checkIsPatient from "../middlewares/checkispatient.middleware.js";
import {
  createAppointment,
  getAppointments,
  updateAppointment,
} from "../controllers/appointment.controller.js";
import checkIsDoctor from "../middlewares/checkisdoctor.middleware.js";
const appointmentRouter = Router();

appointmentRouter.put(
  "/:appointmentId",
  authorize,
  checkIsDoctor,
  updateAppointment
);
appointmentRouter.post("/", authorize, checkIsPatient, createAppointment);

appointmentRouter.get("/:role", authorize, getAppointments);

export default appointmentRouter;
