import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({

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
  phone: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});
export const Candidate = mongoose.model("Candidate", candidateSchema);
