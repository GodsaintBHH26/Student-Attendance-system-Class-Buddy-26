import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uname: { type: String, required: true },
  uemail: { type: String, required: true, unique: true },
  upassword: { type: String, required: true },
});

export default mongoose.model("User", userSchema);