const express = require('express')
const router = express.Router()
const authController = require('../controllers/UserControllers')
const auth = require('../utils/verifyToken')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.put('/update/:id', auth.verifyToken, authController.updateProfile)

module.exports = router
