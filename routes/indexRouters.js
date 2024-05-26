const express = require('express')
const router = express.Router()
const {homePage,studentSignup} = require('../controllers/indexRouterController.js')

// GET /home route
router.get('/home',homePage)

// POST /student/signup route
router.post('/student/signup',studentSignup)

module.exports = router