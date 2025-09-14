import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";

// This is needed without this, any component trying to access the dotenv file won't be able to do so
dotenv.config();

// Creating a instance for express application to start working
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/attendance", attendanceRoute);

app.get("/", (req, res) => {
  res.send("API started to work.....");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Server is running on port: ", PORT));
