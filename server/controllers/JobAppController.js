const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JobApp = require("../models/JobApplication");
const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEYS = process.env.PRIVATE_KEY;
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require('fs');
const gmailUser = process.env.EMAIL_USER;
const gmailPassword = process.env.EMAIL_PASSWORD;

// Standard follow-up message
const followUpMessage = `Dear Hiring Manager,

I hope this message finds you well. I wanted to follow up on my application for the [Job Title] position at [company]. 
I am very enthusiastic about the opportunity to join your team and contribute my skills to your organization.

Thank you for considering my application.

Best regards,
Achmet`;

// NewJobPosition message
const newJobPositionMessage = `Dear Hiring Manager,

I hope this email finds you well. My name is Achmet, and I am writing to express my interest in the [Job Title] position at [company]. I came across your job posting and believe that my skills and experience align with the requirements of the role.

I have experience building full-stack applications using the MERN stack, including several personal projects such as:

- [Whiteboard App](https://whiteboard.myrender.eu)
- [GymBoard Class Booking System](https://gymboard.shaheroes.online)
- [DoctorDesk Appointment Platform](https://doctordesk.shaheroes.online)

These projects reflect my skills in Node.js, Express, React, MongoDB, as well as my ability to work with third-party APIs like Stripe for payment integration.

Additionally, I bring over 10 years of experience working with Joomla and WordPress, which has given me a solid foundation in web development and problem-solving. I am highly motivated to learn and grow, and I am confident that I can contribute to your team’s success.

Please find my CV attached for your consideration. I would be grateful for the opportunity to discuss how my experience and skills can contribute to [company].

Thank you for your time, and I look forward to hearing from you.

Kind regards,  
Achmet`;

const transporter = nodemailer.createTransport({
  host: "smtp.eu.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.API_KEY,
  // When you have an EU-domain, you must specify the endpoint:
  url: "https://api.eu.mailgun.net"
});

const sendFollowUpEmail = async (email, jobTitle, followUpMessage) => {
  const mailOptions = {
    // from: process.env.EMAIL_USER,
    from: 'Achmet Chasankil <gigsakos@gmail.com>',
    to: email,
    subject: `Follow-up on Job Application: ${jobTitle}`,
    html: `<p>Hello,</p><p>${followUpMessage}</p><p>Thank you,</p>`,
  };

  try {
    // await transporter.sendMail(mailOptions);
    await mg.messages.create("myrender.eu", mailOptions);
    console.log(`Follow-up email sent to: ${email}`);
  } catch (error) {
    console.error("Error sending follow-up email:", error);
  }
};

// Create new Job
exports.createJob = async (req, res) => {
  try {
    const { company, jobTitle, comments, jobEmail, applicationDate } = req.body;
    const { userId } = req.user;
    // Input validation for required fields
    if (!company || !jobTitle || !jobEmail || !applicationDate) {
      return res.status(400).json({
        message:
          "Company, job title, Job Email, and application date are required.",
      });
    }

    const newJob = new JobApp({
      company,
      jobTitle,
      comments,
      jobEmail,
      applicationDate,
      user: userId,
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
    const deleteJob = await JobApp.findByIdAndDelete(jobId);
    if (!deleteJob) return res.status(404).json({ message: "No Job found" });
    return res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the job." });
  }
};

// Get user jobs
exports.getUserJobs = async (req, res) => {
  try {
    const userId = req.params.id;
    const jobs = await JobApp.find({ user: userId });
    if (!jobs) return res.status(404).json({ message: "No jobs found." });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error); // Log the error for debugging
  }
};

// Mark as rejected
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Check if the provided status is valid
    const validStatuses = [
      "Applied",
      "Email Send",
      "Followed-up",
      "No Answer",
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

    return res
      .status(200)
      .json({
        message: "Job application status updated successfully.",
        job: updatedJob,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "An error occurred while updating the job application status.",
        error: error.message,
      });
  }
};


// New JobPosition email function
exports.sendNewJobPositionEmail = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await JobApp.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    const mailOptions = {
      from: 'Achmet Chasankil <achmet-chasankil@myrender.eu>',
      to: job.jobEmail,
      subject: `For Job Position ${job.jobTitle} Application`,
      text: newJobPositionMessage
      .replaceAll("[Job Title]", job.jobTitle)
        .replaceAll("[company]", job.company),
        replyTo: "gigsakos@gmail.com",
      attachment: [
        {
          filename: 'achmet-Chasankilcv3.pdf',
          data: fs.createReadStream(path.join(__dirname, '../files/achmet-Chasankilcv3.pdf')), // Stream the file content
          contentType: 'application/pdf',
        }
      ]
    };

    await JobApp.findByIdAndUpdate(jobId, {
      status: "Email Sent",
      lastFollowUpDate: Date.now(),
    });

    const data = await mg.messages.create("myrender.eu", mailOptions);
    console.log("Email sent successfully:", data);
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "An error occurred while sending the email." });
  }
};


// Follow-up email function
exports.followUp = async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await JobApp.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    const mailOptions = {
      from: 'Achmet Chasankil <achmet-chasankil@myrender.eu>',
      to: job.jobEmail, // assuming you store the company's email in the job model
      subject: `Follow-up on ${job.jobTitle} Application`,
      text: followUpMessage
        .replace("[Job Title]", job.jobTitle)
        .replace("[company]", job.company),
        replyTo: "gigsakos@gmail.com",
    };
    await JobApp.findByIdAndUpdate(jobId, {
      status: "Followed-up",
      lastFollowUpDate: Date.now(),
    });

    // await transporter.sendMail(mailOptions);
    await mg.messages.create("myrender.eu", mailOptions);
    res.status(200).json({ message: "Follow-up email sent successfully." });
  } catch (error) {
    console.error("Error sending follow-up email:", error);
    res.status(500).json({ message: "Error sending follow-up email", error });
  }
};

