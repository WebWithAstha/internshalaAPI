const studentModel = require('../models/studentModel.js')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require('../utils/ErrorHandler.js');
const { sendToken } = require('../utils/SendToken.js');

exports.homePage = catchAsyncErrors(async function (req, res, next) {
    res.status(200).json({ message: "homepage" })
})

exports.studentSignup = catchAsyncErrors(async function (req, res, next) {
    const student = await new studentModel(req.body).save()
    // res.status(201).json(student)
    sendToken(student,201,res)
})

exports.studentSignin = catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec()
    if (!student) {
        return next(new ErrorHandler("User with such email does not exist", 401))
    }
    const isMatch = await student.comparePassword(req.body.password)
    if (!isMatch) {
        return next(new ErrorHandler("Incorrect password", 401))
    }
    // res.status(201).json(student)
    sendToken(student,201,res)


})

exports.studentSignout = catchAsyncErrors(async function (req, res, next) {
    res.clearCookie("token")
    res.json({message: "Successfully signed out"})

 })

exports.currentStudent =catchAsyncErrors(async function (req, res, next) {
    const student = await studentModel.findOne({_id:req.id}).exec()
    res.status(200).json(student)
})