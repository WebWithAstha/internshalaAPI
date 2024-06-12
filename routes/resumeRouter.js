const express = require('express')
const router = express.Router()
const { studentResume, addEducation, editEducation, deleteEducation,addResponsibility,editResponsibility, deleteResponsibility, addExperience, editExperience, deleteExperience, addSkill, editSkill, deleteSkill, addWork, editWork, deleteWork, addAccomplishment, editAccomplishment, deleteAccomplishment, addProject, editProject, deleteProject, addCourse, editCourse, deleteCourse } = require('../controllers/resumeRouterController.js')
const { isAuthenticated } = require('../middlewares/auth.js')


// GET /resume route
router.get('/', isAuthenticated, studentResume)

// POST /resume/add-education route
router.post('/add-education', isAuthenticated, addEducation)

// POST /resume/edit-education/:educationId route
router.post('/edit-education/:eduId', isAuthenticated, editEducation)

// POST /resume/delete-education/:educationId route
router.post('/delete-education/:eduId', isAuthenticated, deleteEducation)

// POST /resume/add-responsibility route
router.post('/add-responsibility', isAuthenticated, addResponsibility)

// POST /resume/edit-responsibility/:responsibilityId route
router.post('/edit-responsibility/:respId', isAuthenticated, editResponsibility)

// POST /resume/delete-responsibility/:responsibilityId route
router.post('/delete-responsibility/:respId', isAuthenticated, deleteResponsibility)


// POST /resume/add-experience route
router.post('/add-experience', isAuthenticated, addExperience)

// POST /resume/edit-experience/:experienceId route
router.post('/edit-experience/:expId', isAuthenticated, editExperience)

// POST /resume/delete-experience/:experienceId route
router.post('/delete-experience/:expId', isAuthenticated, deleteExperience)


// POST /resume/add-skill route
router.post('/add-skill', isAuthenticated, addSkill)

// POST /resume/edit-skill/:skillId route
router.post('/edit-skill/:skillId', isAuthenticated, editSkill)

// POST /resume/delete-skill/:skillId route
router.post('/delete-skill/:skillId', isAuthenticated, deleteSkill)

// POST /resume/add-work route
router.post('/add-work', isAuthenticated, addWork)

// POST /resume/edit-work/:workId route
router.post('/edit-work/:workId', isAuthenticated, editWork)

// POST /resume/delete-work/:workId route
router.post('/delete-work/:workId', isAuthenticated, deleteWork)

// POST /resume/add-accomplishment route
router.post('/add-accomplishment', isAuthenticated,addAccomplishment)

// POST /resume/edit-accomplishment/:accomplishmentId route
router.post('/edit-accomplishment/:accompId', isAuthenticated, editAccomplishment)

// POST /resume/delete-accomplishment/:accomplishmentId route
router.post('/delete-accomplishment/:accompId', isAuthenticated, deleteAccomplishment)

// POST /resume/add-project route
router.post('/add-project', isAuthenticated,addProject)

// POST /resume/edit-project/:projectId route
router.post('/edit-project/:projectId', isAuthenticated, editProject)

// POST /resume/delete-project/:projectId route
router.post('/delete-project/:projectId', isAuthenticated, deleteProject)

// POST /resume/add-course route
router.post('/add-course', isAuthenticated,addCourse)

// POST /resume/edit-course/:courseId route
router.post('/edit-course/:courseId', isAuthenticated, editCourse)

// POST /resume/delete-course/:courseId route
router.post('/delete-course/:courseId', isAuthenticated, deleteCourse)




module.exports = router
