const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobEmail: {
      type: String,
      required: true,
    },
    applicationDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    followUpDays: {
      type: Number,
      default: 0,
    },
    lastFollowUpDate: {
      type: Date,
      default: null,
    },
    interviewDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Followed-up",
        "No Answer",
        "Interview Scheduled",
        "Interview Completed",
        "Rejected",
      ],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);
const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
module.exports = JobApplication;
