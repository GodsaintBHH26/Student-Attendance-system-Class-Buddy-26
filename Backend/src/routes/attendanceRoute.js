import express from "express";
import {
  addAttendance,
  displayAttendance,
  getStudentAttendance
} from "../controller/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware(["student", "teacher", "admin"]),
  displayAttendance
);
router.post("/", authMiddleware(["teacher", "admin"]), addAttendance);
router.get('/student/:studentId', authMiddleware(["teacher", "admin"]), getStudentAttendance )
export default router;
