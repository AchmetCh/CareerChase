const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JobApp = require("../models/JobApplication");
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEYS = process.env.PRIVATE_KEY;
const nodemailer = require('nodemailer')

const gmailUser = process.env.EMAIL_USER;
const gmailPassword = process.env.EMAIL_PASSWORD;

// Standard follow-up message
const followUpMessage = `Dear Hiring Manager,

I hope this message finds you well. I wanted to follow up on my application for the [Job Title] position at [company]. 
I am very enthusiastic about the opportunity to join your team and contribute my skills to your organization.

Thank you for considering my application.

Best regards,
Achmet`;


const transporter = nodemailer.createTransport({
    host: "mail.myrender.eu",
    port: 465,
    secure: true,
    auth: {
      user:gmailUser,
      pass: gmailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
});

const sendFollowUpEmail = async (email, jobTitle, followUpMessage) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Follow-up on Job Application: ${jobTitle}`,
        html: `<p>Hello,</p><p>${followUpMessage}</p><p>Thank you,</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Follow-up email sent to: ${email}`);
    } catch (error) {
        console.error("Error sending follow-up email:", error);
    }
};

// Create new Job
exports.createJob = async (req, res) => {
  try {
    const { company, jobTitle, jobEmail, applicationDate } = req.body;

    // Input validation for required fields
    if (!company || !jobTitle || !jobEmail || !applicationDate) {
      return res.status(400).json({
        message: "Company, job title, Job Email, and application date are required.",
      });
    }

    const newJob = new JobApp({
      company,
      jobTitle,
      jobEmail,
      applicationDate,
    });

    await newJob.save();

    return res.status(201).json({
      message: "Job application created successfully.",
      job: newJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the job application.",
      error: error.message,
    });
  }
};


// Get all Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobApp.find().sort({ applicationDate: -1 }); // Retrieve all
    // jobs from the database, sorted by application date in descending order
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the jobs." });
  }
};

//Get job by Id
exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobApp.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });
    return res.status(200).json(job);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the job." });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobApp.findByIdAndUpdate(jobId, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found." });
    return res.status(200).json(job);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while updating the job." });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    await JobApp.findByIdAndDelete(jobId);
    if (!jobApp) return res.status(404).json({message: 'No Job found'})
    return res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the job." });
  }
};

// Mark as rejected
exports.updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Check if the provided status is valid
        const validStatuses = [
            "Applied",
            "Followed-up",
            "Interview Scheduled",
            "Interview Completed",
            "Rejected",
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided." });
        }

        const updatedJob = await JobApp.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job application not found." });
        }

        return res.status(200).json({ message: "Job application status updated successfully.", job: updatedJob });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while updating the job application status.", error: error.message });
    }
};

// Follow-up email function
exports.followUp = async (req, res) => {
    const jobId = req.params.id;
  
    try {
      const job = await JobApp.findById(jobId);
      if (!job) return res.status(404).json({ message: "Job not found." });
  
      const mailOptions = {
        from: gmailUser,
        to: job.jobEmail, // assuming you store the company's email in the job model
        subject: `Follow-up on ${job.jobTitle} Application`,
        text: followUpMessage
        .replace("[Job Title]", job.jobTitle)
        .replace("[company]", job.company)
      };
      await JobApp.findByIdAndUpdate(jobId, { status: "Followed-up", lastFollowUpDate: Date.now() });

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Follow-up email sent successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error sending follow-up email", error });
    }
  };
  


