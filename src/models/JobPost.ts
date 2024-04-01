import mongoose from "mongoose";
import { User } from "./User";

const jobPostSchema = new mongoose.Schema({
  title: {
    default: null,
    type: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  description: {
    default: null,
    type: String
  },
  requirements: {
    default: [],
    type: Array<String>
  },
  responsibilities: {
    default: [],
    type: Array<String>
  },
  location: {
    default: null,
    type: String
  },
  employmentType: {
    default: null,
    type: String
  },
  applicationDeadline: {
    default: null,
    type: Date
  },
}, {
  timestamps: true
});
export const jobPost = mongoose.model("jobPost", jobPostSchema);
