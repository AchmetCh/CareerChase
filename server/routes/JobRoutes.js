const express = require('express')
const router = express.Router()
const JobController = require('../controllers/JobAppController')
const auth = require('../utils/verifyToken')

router.post('/newJob', auth.verifyToken, JobController.createJob)
router.get('/getAllJobs', auth.verifyToken, JobController.getAllJobs)
router.get('/getJobById/:id', auth.verifyToken, JobController.getJobById)
router.get('/getUserJobs/:id', auth.verifyToken, JobController.getUserJobs)
router.put('/updateJob/:id', auth.verifyToken, JobController.updateJob)
router.delete('/deleteJob/:id', auth.verifyToken, JobController.deleteJob)
router.put('/updateJobStatus/:id', auth.verifyToken, JobController.updateJobStatus)
router.post('/followUpEmail/:id', auth.verifyToken, JobController.followUp)

module.exports = router