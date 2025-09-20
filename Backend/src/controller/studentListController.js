import User from "../models/userModel.js";

export const getStudentNameList = async (req, res) => {
  try {
    let classAssigned;

    if (req.user.role === "teacher") {
      classAssigned = req.user.class_assigned;
    } else if (req.user.role === "admin") {
      classAssigned = req.query.class_assigned;
    }

    if (!classAssigned) {
      return res.status(400).json({ msg: "Class not specified ❌" });
    }

    const students = await User.find({
      role: "student",
      class_assigned: classAssigned,
    }).select("uname unique_id class_assigned");

    res.json({ students });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
