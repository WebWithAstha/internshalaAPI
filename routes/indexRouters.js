const express = require('express')
const router = express.Router()
const {homePage,studentSignup, studentSignin,studentSignout,currentStudent,studentForgotPassword,studentNewPassword,resetPassword,updateStudent,updateStudentAvatar, applyInternship, applyJob} = require('../controllers/indexRouterController.js')
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

// GET /student/newpassword/:student route
router.post('/student/newpassword/:id',studentNewPassword)

// POST /student/resetpassword route
router.post('/student/resetpassword',isAuthenticated,resetPassword)

// POST /student/update/:student route
router.post('/student/update/:id',isAuthenticated,updateStudent)

// POST /student/avatar/:student route
router.post('/student/avatar/:id',isAuthenticated,updateStudentAvatar)

// POST /student/apply/internship/:internship route
router.post('/student/apply/internship/:id',isAuthenticated,applyInternship)

// POST /student/apply/job/:job route
router.post('/student/apply/job/:id',isAuthenticated,applyJob)

module.exports = router