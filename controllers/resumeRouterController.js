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