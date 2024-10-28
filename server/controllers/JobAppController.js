const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JobApp = require("../models/JobApplication");
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEYS = process.env.PRIVATE_KEY;

// Create new Job
exports.createJob = async (req, res) => {
    try {
        const { company, jobTitle, applicationDate, followUpDays, lastFollowUpDate, interviewDate, status} = req.body
        const newJob = new JobApp({ company, jobTitle, applicationDate, follow, lastFollowUpDate, interviewDate, status})
}