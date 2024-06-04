const express = require('express')
const router = express.Router()
const {homePage,studentSignup, studentSignin,studentSignout,currentStudent,studentForgotPassword,studentNewPassword,resetPassword} = require('../controllers/indexRouterController.js')
const { isAuthenticated } = require('../middlewares/auth.js')

// GET /home route
router.get('/home',isAuthenticated,homePage)


// GET /student route
router.get('/student',isAuthenticated,currentStudent)

// POST /student/signup route
router.post('/student/signup',studentSignup)

// POST /student/signin route
router.post('/student/signin',studentSignin)

// POST /student/signout route
router.post('/student/signout',isAuthenticated,studentSignout)

// POST /student/forgotpassword route
router.post('/student/forgotpassword',studentForgotPassword)

// POST /student/newpassword/:id route
router.post('/student/newpassword/:id',studentNewPassword)

// POST /student/resetpassword route
router.post('/student/resetpassword',isAuthenticated,resetPassword)

module.exports = router