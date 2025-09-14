import Attendance from "../models/attendanceModel.js";
import User from "../models/userModel.js";

export const addAttendance = async (req, res) => {
  try {
    const { studentId, date, role, status } = req.body;
    const student = await User.findOne({ unique_id: studentId });

    if (!student) {
      return res.status(404).json({ msg: "Student does not exist ❌" });
    }

    if (req.user.role === "teacher") {
      if (req.user.assigned_class !== student.assigned_class) {
        return res
          .status(403)
          .json({ msg: "Not in your class, access denied 🚫" });
      }
    }

    const newAttendance = new Attendance({
      student: student._id,
      teacher: req.user.id,
      date,
      role,
      att_state: status,
      class_assigned: student.class_assigned,
    });

    await newAttendance.save();
    res.status(201).json({ msg: "Attendance record created ✅" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const displayAttendance = async (req, res) => {
  try {
    let records;
    if (req.user.role === "student") {
      records = await Attendance.find({ student: req.user.id })
        .populate("teacher", "uname")
        .populate("student", "uname unique_id");
    } else if (req.user.role === "teacher") {
      records = await Attendance.find({
        class_assigned: req.user.class_assigned,
      })
        .populate("student", "uname unique_id")
        .populate("teacher", "uname");
    } else if (req.user.role === "admin") {
      records = await Attendance.find({})
        .populate("teacher", "uname class_assigned")
        .populate("student", "uname unique_id");
    }
    res.status(200).json({ msg: "All records fetched ✔️", records });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
