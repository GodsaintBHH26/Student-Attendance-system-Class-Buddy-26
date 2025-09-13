import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const regUser = async (req, res) => {
  try {
    const { uname, uemail, upassword } = req.body;
    const existingUser = await User.findOne({ uemail });

    if (existingUser)
      return res.status(400).json({ msg: "‼️User already exists!" });

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(upassword, salt);

    const newUser = new User({
      uname: uname,
      uemail: uemail,
      upassword: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, uname: newUser.uname, uemail: newUser.uemail },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      msg: `User created successfully ✅`,
      token,
      user: { id: newUser._id, uname: newUser.uname, uemail: newUser.uemail },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const logUser = async (req, res) => {
  try {
    const { uname, uemail, upassword } = req.body;
    const existingUser = await User.findOne({ uemail });

    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid creds ❌" });
    }

    const isMatching = await bcrypt.compare(upassword, existingUser.upassword);
    if (!isMatching) return res.status(400).json({ msg: "Invalid creds ❌" });

    const token = jwt.sign(
      {
        id: existingUser._id,
        uname: existingUser.uname,
        uemail: existingUser.uemail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({
        msg: "Successful Login ✅",
        token,
        user: {
          id: existingUser._id,
          uname: existingUser.uname,
          uemail: existingUser.uemail,
        },
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
