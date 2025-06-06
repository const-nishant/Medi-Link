import nodemailer from "nodemailer";
import { MAILER_USER, MAILER_PASS } from "./config/env.js";

export async function sendMail(recieverEmailId, subject, body, next) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAILER_USER,
        pass: MAILER_PASS,
      },
    });

    const mailOptions = {
      from: MAILER_USER,
      to: recieverEmailId,
      subject: subject,
      html: body,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to " + recieverEmailId);
  } catch (error) {
    next(error);
  }
}
