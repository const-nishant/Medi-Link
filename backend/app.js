import cookieParser from "cookie-parser";
import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import appointmentRouter from "./routes/appoinment.route.js";
import userRouter from "./routes/user.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Import routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/user", userRouter);

// Middleware
app.use(errorMiddleware);

//default route
app.get("/", (req, res) => {
  res.send("Welcome to the media-link!");
});

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
