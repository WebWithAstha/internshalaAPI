const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middlewares/auth.js')
const { employeeSignup, employeeSignin, employeeSignout, homePage, currentEmployee, resetPassword, employeeForgotPassword, employeeNewPassword, updateEmployee, updateEmployeeOrgLogo, createInternship, readSingleInternship, readInternships } = require('../controllers/employeeRouterController.js')

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

// POST /employee/forgotpassword route
router.post('/forgotpassword',employeeForgotPassword)

// GET /newpassword/:student route
router.get('/newpassword/:id',employeeNewPassword)

// POST /employee/resetpassword route
router.post('/resetpassword',isAuthenticated,resetPassword)

// POST /employee/update/:student route
router.post('/update/:id',isAuthenticated,updateEmployee)

// POST /employee/avatar/:student route
router.post('/logo/:id',isAuthenticated,updateEmployeeOrgLogo)

// employee intership related routes

// POST /employee/create/internship route
router.post('/create/internship',isAuthenticated,createInternship)

// POST /employee/read/internship/internshipId route
router.post('/read/internship/:id',isAuthenticated,readSingleInternship)

// POST /employee/read/internships route
router.post('/read/internships',isAuthenticated,readInternships)

module.exports = router