import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const regUser = async (req, res) => {
  try {
    const { uname, unique_id, upassword, class_assigned, role } = req.body;
    const existingUser = await User.findOne({ unique_id });

    if (existingUser)
      return res.status(400).json({ msg: "‼️User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(upassword, salt);

    const newUser = new User({
      uname: uname,
      unique_id: unique_id,
      upassword: hashedPassword,
      class_assigned: class_assigned,
      role: role,
    });

    await newUser.save();

    res.status(201).json({
      msg: `User created successfully ✅`,
      user: {
        id: newUser._id,
        uname: newUser.uname,
        unique_id: newUser.unique_id,
        class_assigned: newUser.class_assigned,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const logUser = async (req, res) => {
  try {
    const { unique_id, upassword } = req.body;
    const existingUser = await User.findOne({ unique_id });

    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid creds ❌" });
    }

    const isMatching = await bcrypt.compare(upassword, existingUser.upassword);
    if (!isMatching) return res.status(400).json({ msg: "Invalid creds ❌" });

    const token = jwt.sign(
      {
        id: existingUser._id,
        uname: existingUser.uname,
        unique_id: existingUser.unique_id,
        role: existingUser.role,
        class_assigned:existingUser.class_assigned
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      msg: "Successful Login ✅",
      token,
      user: {
        id: existingUser._id,
        uname: existingUser.uname,
        unique_id: existingUser.unique_id,
        role: existingUser.role,
        class_assigned: existingUser.class_assigned,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
