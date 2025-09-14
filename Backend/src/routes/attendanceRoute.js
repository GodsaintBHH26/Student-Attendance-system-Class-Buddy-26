import express from "express";
import {
  addAttendance,
  displayAttendance,
} from "../controller/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware(["student", "teacher", "admin"]),
  displayAttendance
);
router.post("/", authMiddleware(["teacher", "admin"]), addAttendance);

export default router;
