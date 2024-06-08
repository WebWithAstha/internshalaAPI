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
    student.resume.skill.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "skill add successfully."})
})

exports.editSkill = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const skillIndex = student.resume.skill.findIndex(e => e.id == req.params.skillId)
    student.resume.skill[skillIndex] = {...student.resume.skill[skillIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "skill updated successfully."})
})

exports.deleteSkill = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.skill = student.resume.skill.filter(e=>e.id !== req.params.skillId)
    await student.save()
    res.status(200).json({ message: "skill deleted successfully."})
})

exports.addWork = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.work.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "work add successfully."})
})

exports.editWork = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const workIndex = student.resume.work.findIndex(e => e.id == req.params.workId)
    student.resume.work[workIndex] = {...student.resume.work[workIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "work updated successfully."})
})

exports.deleteWork = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.work = student.resume.work.filter(e=>e.id !== req.params.workId)
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
    student.resume.project.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "project add successfully."})
})

exports.editProject = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const projectIndex = student.resume.project.findIndex(e => e.id == req.params.projectId)
    student.resume.project[projectIndex] = {...student.resume.project[projectIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "project updated successfully."})
})

exports.deleteProject = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.project = student.resume.project.filter(e=>e.id !== req.params.projectId)
    await student.save()
    res.status(200).json({ message: "project deleted successfully."})
})

exports.addCourse = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.course.push({...req.body,id:uuidv4()})
    await student.save()
    res.status(200).json({ message: "course add successfully."})
})

exports.editCourse = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    const courseIndex = student.resume.course.findIndex(e => e.id == req.params.courseId)
    student.resume.course[courseIndex] = {...student.resume.course[courseIndex],...req.body}
    await student.save()
    res.status(200).json({ message: "course updated successfully."})
})

exports.deleteCourse = catchAsyncErrors(async function(req,res,next){
    const student = await studentModel.findById(req.id).exec()
    student.resume.course = student.resume.course.filter(e=>e.id !== req.params.courseId)
    await student.save()
    res.status(200).json({ message: "course deleted successfully."})
})