import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uname: { type: String, required: true },
  unique_id: { type: String, required: true, unique: true }, // could be student roll no. or teacher/emp. no
  upassword: { type: String, required: true },
  class_assigned:{type:String},
  role:{type:String, enum:["student", "teacher", "admin"], required:true}
});

export default mongoose.model("User", userSchema);