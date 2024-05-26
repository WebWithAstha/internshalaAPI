const studentModel = require('../models/studentModel.js')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require('../utils/ErrorHandler.js');

// async error handled using trycatch

/*exports.homePage = async function(req,res){
    try {
        res.status(200).json({message:"homepage"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}*/


exports.homePage = catchAsyncErrors(async function (req, res, next) {
    res.status(200).json({ message: "homepage" })
})

exports.studentSignup = catchAsyncErrors(async function (req, res, next) {
    const student = await new studentModel(req.body).save()
    res.status(201).json(student)
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
    res.json(student)

})

exports.studentSignout = catchAsyncErrors(async function (req, res, next) { })