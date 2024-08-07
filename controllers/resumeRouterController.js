const studentModel = require('../models/studentModel.js')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require('../utils/ErrorHandler.js');
const { v4: uuidv4 } = require('uuid');

exports.studentResume = catchAsyncErrors(async function(req,res,next){
    const {resume} = await studentModel.findById(req.id).exec()
    res.status(200).json({ message: "Secure resume route", resume})
})

exports.addEducation = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.education.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "Education add successfully."})
})

exports.editEducation = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const educationIndex = student.resume.education.findIndex(e => e.id == req.params.eduId)
    student.resume.education[educationIndex] = {...student.resume.education[educationIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "Education updated successfully."})
})

exports.deleteEducation = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.education = student.resume.education.filter(e=>e.id !== req.params.eduId)
    await student.save()
    res.status(200).json({ message: "Education deleted successfully."})
})

exports.addResponsibility = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.responsibility.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "Responsibility add successfully."})
})

exports.editResponsibility = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const responsibilityIndex = student.resume.responsibility.findIndex(e => e.id == req.params.respId)
    student.resume.responsibility[responsibilityIndex] = {...student.resume.responsibility[responsibilityIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "Responsibility updated successfully."})
})

exports.deleteResponsibility = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.responsibility = student.resume.responsibility.filter(e=>e.id !== req.params.respId)
    await student.save()
    res.status(200).json({ message: "Responsibility deleted successfully."})
})

exports.addExperience = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.experience.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "experience add successfully."})
})

exports.editExperience = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const experienceIndex = student.resume.experience.findIndex(e => e.id == req.params.expId)
    student.resume.experience[experienceIndex] = {...student.resume.experience[experienceIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "experience updated successfully."})
})

exports.deleteExperience = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.experience = student.resume.experience.filter(e=>e.id !== req.params.expId)
    await student.save()
    res.status(200).json({ message: "experience deleted successfully."})
})

exports.addSkill = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.skills.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "skill add successfully."})
})

exports.editSkill = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const skillIndex = student.resume.skills.findIndex(e => e.id == req.params.skillId)
    student.resume.skills[skillIndex] = {...student.resume.skills[skillIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "skill updated successfully."})
})

exports.deleteSkill = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.skills = student.resume.skills.filter(e=>e.id !== req.params.skillId)
    await student.save()
    res.status(200).json({ message: "skill deleted successfully."})
})

exports.addWork = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.works.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "work add successfully."})
})

exports.editWork = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const workIndex = student.resume.works.findIndex(e => e.id == req.params.workId)
    student.resume.works[workIndex] = {...student.resume.works[workIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "work updated successfully."})
})

exports.deleteWork = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.works = student.resume.works.filter(e=>e.id !== req.params.workId)
    await student.save()
    res.status(200).json({ message: "work deleted successfully."})
})

exports.addAccomplishment = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.accomplishment.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "accomplishment add successfully."})
})

exports.editAccomplishment = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const accomplishmentIndex = student.resume.accomplishment.findIndex(e => e.id == req.params.accompId)
    student.resume.accomplishment[accomplishmentIndex] = {...student.resume.accomplishment[accomplishmentIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "accomplishment updated successfully."})
})

exports.deleteAccomplishment = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.accomplishment = student.resume.accomplishment.filter(e=>e.id !== req.params.accompId)
    await student.save()
    res.status(200).json({ message: "accomplishment deleted successfully."})
})

exports.addProject = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.projects.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "project add successfully."})
})

exports.editProject = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const projectIndex = student.resume.projects.findIndex(e => e.id == req.params.projectId)
    student.resume.projects[projectIndex] = {...student.resume.projects[projectIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "project updated successfully."})
})

exports.deleteProject = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.projects = student.resume.projects.filter(e=>e.id !== req.params.projectId)
    await student.save()
    res.status(200).json({ message: "project deleted successfully."})
})

exports.addCourse = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.courses.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "course add successfully."})
})

exports.editCourse = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const courseIndex = student.resume.courses.findIndex(e => e.id == req.params.courseId)
    student.resume.courses[courseIndex] = {...student.resume.courses[courseIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "course updated successfully."})
})

exports.deleteCourse = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.courses = student.resume.courses.filter(e=>e.id !== req.params.courseId)
    await student.save()
    res.status(200).json({ message: "course deleted successfully."})
})