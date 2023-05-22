import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: {
    url: { type: String },
    ref: { type: String },
  },
  userType: {
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    required: true,
  },
  userName: {
    type: String,
    required: true,
    // minlength: 5,
    maxlength: 15,
    unique: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
  },
  emailToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
