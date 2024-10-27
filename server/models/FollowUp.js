const mongoose = require("mongoose");

const FollowUpSchema = new mongoose.Schema({
  id: { type: String },
  FollowUpDate: {
    type: Date,
    default: Date.now,
  },
  FollowUpStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  JobApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobApplication",
  },
});
const FollowUp = mongoose.model('FollowUp', FollowUp)
module.exports = FollowUp;

