const studentModel = require('../models/studentModel.js')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require('../utils/ErrorHandler.js');
const { sendToken } = require('../utils/SendToken.js');
const imagekit = require('../utils/imagekit.js').initImagekit()
const path = require('path')

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
    const student = await studentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
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