import cookieParser from "cookie-parser";
import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routes
app.use("/api/v1/auth", authRouter);

//default route
app.get("/", (req, res) => {
  res.send("Welcome to the media-link!");
});

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
