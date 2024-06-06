const express = require('express')
const router = express.Router()
const { studentResume, addEducation, editEducation, deleteEducation } = require('../controllers/resumeRouterController.js')
const { isAuthenticated } = require('../middlewares/auth.js')


// GET /resume route
router.get('/', isAuthenticated, studentResume)

// POST /resume/add-education route
router.post('/add-education', isAuthenticated, addEducation)

// POST /resume/edit-education/:educationId route
router.post('/edit-education/:eduId', isAuthenticated, editEducation)

// POST /resume/delete-education/:educationId route
router.post('/delete-education/:eduId', isAuthenticated, deleteEducation)




module.exports = router
