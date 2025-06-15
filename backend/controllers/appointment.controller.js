import Appointment from "../models/appoinment.model.js  ";
import { checkIsDateFuture, getEpochMilliSeconds } from "../helper.js";
import loadash from "lodash";

export const createAppointment = async (req, res, next) => {
  try {
    const newappointment = req.body;

    if (!newappointment) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment data",
      });
    }
    if (!newappointment.dateTime) {
      return res.status(500).json({
        success: false,
        message: "invalid date and time",
      });
    }

    const date = getEpochMilliSeconds(newappointment.dateTime);

    const futureDate = await checkIsDateFuture(date);

    newappointment.dateTime = futureDate;

    const appointment = await Appointment.create(newappointment);

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const appointmentId = req.params.appointmentId;
    const updatedAppointment = req.body;

    if (loadash.isEmpty(updatedAppointment)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment data",
      });
    }

    // Update the appointment in the database
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      updatedAppointment,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    if (req.params.role === "patient") {
      const appointments = await Appointment.find({ patientId: req.userId });
      res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        data: appointments,
      });
    } else if (req.params.role === "doctor") {
      const appointments = Appointment.find({ doctorId: req.userId });
      res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        data: appointments,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }
  } catch (error) {
    next(error);
  }
};
