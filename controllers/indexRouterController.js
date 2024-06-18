const studentModel = require('../models/studentModel.js')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require('../utils/ErrorHandler.js');
const { sendToken } = require('../utils/SendToken.js');
const imagekit = require('../utils/imagekit.js').initImagekit()
const path = require('path');
const { query } = require('express');
const internshipModel = require('../models/internshipModel.js');
const jobModel = require('../models/jobModel.js');

exports.homePage = catchAsyncErrors(async function (req, res, next) {
    res.status(200).json({ message: "homepage" })
})

exports.studentSignup = catchAsyncErrors(async function (req, res, next) {
    const student = await new studentModel(req.body).save()
    // res.status(201).json(student)
    sendToken(student, 201, res)
})

exports.studentSignin = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec()
    if (!student) {
        return next(new ErrorHandler("User with such email does not exist", 401))
    }
    const isMatch = await student.comparePassword(req.body.password)
    if (!isMatch) {
        return next(new ErrorHandler("Invalid Credentials", 401))
    }
    // res.status(201).json(student)
    sendToken(student, 201, res)


})

exports.studentSignout = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ _id: req.id })
    if (!student) {
        return next(new ErrorHandler("Student not found.", 500))
    }
    res.clearCookie("token")
    res.json({ message: "Successfully signed out" })

})

exports.currentStudent = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ _id: req.id }).exec()
    if (!student) { return next(new ErrorHandler("Student not found")) }
    res.status(200).json(student)
})

exports.studentForgotPassword = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ email: req.body.email }).exec()
    student.resetPassword = 0
    const url = `${req.protocol}://${req.hostname}/student/newpassword/${student.id}`
    res.status(200).json({ student, url })
})

exports.studentNewPassword = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ _id: req.params.id }).exec()
    if (student.resetPassword === 0) {
        student.password = req.body.password
        student.resetPassword = 1
        await student.save()
        res.status(200).json({ message: "password updated successfully." })
    } else {
        return next(new ErrorHandler("Link is invalid.", 500))
    }
})

exports.resetPassword = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ _id: req.id }).exec()
    student.password = req.body.password
    await student.save()
    res.status(200).json({ message: "password reset successfully." })
})

exports.updateStudent = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators:true,context:query}).exec()
    if (!student) { return next(new ErrorHandler("Oops student not found.")) }
    res.status(200).json({ message: "Student updated successfully.", student })
})

exports.updateStudentAvatar = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ _id: req.params.id }).exec()
    if (!student) { return next(new ErrorHandler("Oops student not found.")) }
    if (!req.files) { return next(new ErrorHandler("Kindly upload an avatar")) }
    const file = req.files.avatar
    const modifiedFileName  = `resumebuilder-${Date.now()}${path.extname(file.name)}`
    if(student.avatar.fileId !=''){
        await imagekit.deleteFile(student.avatar.fileId)
    }
    const {fileId,url} =  await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName
    })
    student.avatar = {fileId,url}
    await student.save()
    res.status(200).json({ message: "Student avatar updated successfully."})
})

exports.applyInternship = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ _id: req.id }).exec()
    if (!student) { return next(new ErrorHandler("Student not found")) }
    const internship = await internshipModel.findById(req.params.id).exec()
    if (!internship) { return next(new ErrorHandler("internship not found")) }
    student.internships.push(internship._id)
    internship.appliers.push(student._id)
    student.save()
    internship.save()
    res.status(200).json({success: true, message:"Internship applied successfully."})
})

exports.applyJob = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ _id: req.id }).exec()
    if (!student) { return next(new ErrorHandler("Student not found")) }
    const job = await jobModel.findById(req.params.id).exec()
    if (!job) { return next(new ErrorHandler("Job not found")) }
    student.jobs.push(job._id)
    job.appliers.push(student._id)
    student.save()
    job.save()
    res.status(200).json({success: true, message:"Job applied successfully."})
})