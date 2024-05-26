const studentModel = require('../models/studentModel.js')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

// async error handled using trycatch

/*exports.homePage = async function(req,res){
    try {
        res.status(200).json({message:"homepage"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}*/


exports.homePage = catchAsyncErrors(async function(req,res,next){
    res.status(200).json({message:"homepage"})
})

exports.studentSignup = catchAsyncErrors(async function(req,res,next){
    const student = await new studentModel(req.body).save()
    res.status(201).json(student)
})