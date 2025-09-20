import express from "express";
import { getStudentNameList } from "../controller/studentListController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/list",
  authMiddleware(["teacher", "admin"]),
  getStudentNameList
);

export default router;
