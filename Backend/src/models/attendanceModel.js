import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    teacher: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    att_state: { type: String, enum: ["present", "absent"], required: true },
    class_assigned: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema)