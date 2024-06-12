const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middlewares/auth.js')
const { employeeSignup, employeeSignin, employeeSignout, homePage, currentEmployee } = require('../controllers/employeeRouterController.js')

// GET /home route
router.get('/home',isAuthenticated,homePage)


// GET /employee route
router.get('/',isAuthenticated,currentEmployee)

// POST /employee/signup route
router.post('/signup',employeeSignup)

// POST /employee/signin route
router.post('/signin',employeeSignin)

// POST /employee/signout route
router.post('/signout',isAuthenticated,employeeSignout)

// // POST /employee/forgotpassword route
// router.post('/forgotpassword',studentForgotPassword)

// // GET /newpassword/:student route
// router.get('/newpassword/:id',studentNewPassword)

// // POST /employee/resetpassword route
// router.post('/resetpassword',isAuthenticated,resetPassword,updateStudent)

// // POST /employee/update/:student route
// router.post('/update/:id',isAuthenticated,updateStudent)

// // POST /employee/avatar/:student route
// router.post('/avatar/:id',isAuthenticated,updateStudentAvatar)

module.exports = router