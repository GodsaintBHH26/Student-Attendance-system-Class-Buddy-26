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

export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findOne({ unique_id: studentId });
    if (!student) {
      return res.status(404).json({ msg: "Student not found ❌" });
    }

    if (
      req.user.role === "teacher" &&
      req.user.class_assigned !== student.class_assigned
    ) {
      return res.status(403).json({ msg: "Access denied 🚫" });
    }

    const records = await Attendance.find({ student: student._id });
    const presentNum = records.filter((r) => r.att_state === "present").length;
    const absentNum = records.filter((r) => r.att_state === "absent").length;

    res.json({
      student: { uname: student.uname, unique_id: student.unique_id },
      totalClasses: records.length,
      presentCount: presentNum,
      absentCount: absentNum,
      details: records,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
