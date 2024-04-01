import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  provider: {
    default: null,
    type: String
  },
  profileId: {
    default: null,
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: false,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
export const User = mongoose.model("User", userSchema);
