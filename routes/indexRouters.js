const express = require('express')
const router = express.Router()
const {homePage,studentSignup, studentSignin} = require('../controllers/indexRouterController.js')

// GET /home route
router.get('/home',homePage)

// POST /student/signup route
router.post('/student/signup',studentSignup)

// POST /student/signup route
router.post('/student/signin',studentSignin)

module.exports = router