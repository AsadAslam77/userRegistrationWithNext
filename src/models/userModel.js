import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please provide your Email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  isVerfied: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean, 
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", UserSchema);
export default User;
