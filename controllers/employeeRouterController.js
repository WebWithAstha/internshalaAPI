const employeeModel = require('../models/employeeModel.js')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require('../utils/ErrorHandler.js');
const { sendToken } = require('../utils/SendToken.js');
const imagekit = require('../utils/imagekit.js').initImagekit()
const path = require('path');
const { query } = require('express');
const internshipModel = require('../models/internshipModel.js');
const { sendMail } = require('../utils/sendMail.js');

exports.homePage = catchAsyncErrors(async function (req, res, next) {
    res.status(200).json({ message: "homepage" })
})

exports.employeeSignup = catchAsyncErrors(async function (req, res, next) {
    const employee = await new employeeModel(req.body).save()
    // res.status(201).json(employee)
    sendToken(employee, 201, res)
})

exports.employeeSignin = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOne({ email: req.body.email }).select("+password").exec()
    if (!employee) {
        return next(new ErrorHandler("User with such email does not exist", 401))
    }
    const isMatch = await employee.comparePassword(req.body.password)
    if (!isMatch) {
        return next(new ErrorHandler("Invalid Credentials", 401))
    }
    // res.status(201).json(employee)
    sendToken(employee, 201, res)
})

exports.employeeSignout = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOne({ _id: req.id })
    if (!employee) {
        return next(new ErrorHandler("Employee not found.", 500))
    }
    res.clearCookie("token")
    res.json({ message: "Successfully signed out" })

})

exports.currentEmployee = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOne({ _id: req.id }).exec()
    if (!employee) { return next(new ErrorHandler("employee not found")) }
    res.status(200).json(employee)
})

exports.employeeForgotPassword = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOne({ email: req.body.email }).exec()
    const url = `${req.protocol}://${req.get('host')}/employee/newpassword/${employee.id}`
    sendMail(req, res, next, url)
    employee.resetPassword = 0
    employee.save()
    res.status(200).json({ url })
})

exports.employeeNewPassword = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOne({ _id: req.params.id }).exec()
    if (employee.resetPassword === 0) {
        employee.password = req.body.password
        employee.resetPassword = 1
        await employee.save()
        res.status(200).json({ message: "password updated successfully." })
    } else {
        return next(new ErrorHandler("Link is invalid.", 500))
    }
})

exports.resetPassword = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOne({ _id: req.id }).exec()
    if (req.body.currentpassword === employee.password) {
        employee.password = req.body.newpassword

    } else {
        return next(new ErrorHandler("Wrong Password", 404))
    }
    await employee.save()
    res.status(200).json({ message: "password reset successfully." })
})

exports.updateEmployee = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators:true,context:query,new:true}).exec()
    if (!employee) { return next(new ErrorHandler("Oops employee not found.")) }
    res.status(200).json({ message: "employee updated successfully.", employee })
})

exports.updateEmployeeOrgLogo = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findOne({ _id: req.params.id }).exec()
    if (!employee) { return next(new ErrorHandler("Oops employee not found.")) }
    if (!req.files) { return next(new ErrorHandler("Kindly upload a logo.")) }
    const file = req.files.organizationLogo
    const modifiedFileName  = `resumebuilder-${Date.now()}${path.extname(file.name)}`
    if(employee.organizationLogo.fileId !=''){
        await imagekit.deleteFile(employee.organizationLogo.fileId)
    }
    const {fileId,url} =  await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName
    })
    employee.organizationLogo = {fileId,url}
    await employee.save()
    res.status(200).json({ message: "employee profile updated successfully."})
})

// employee internship controllers

exports.createInternship = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findById(req.id).exec();
    if (!employee) {
        return next(new ErrorHandler("Employee not found.", 500));
    }
    const internship = await new internshipModel(req.body).save();
    employee.internships.push(internship._id);
    internship.employee=employee._id;
    employee.save();
    internship.save();
    res.status(201).json(internship);
})

exports.readSingleInternship = catchAsyncErrors(async function (req, res, next) {
    const internship = await internshipModel.findById(req.params.id).exec()
    res.status(201).json(internship)
})

exports.readInternships = catchAsyncErrors(async function (req, res, next) {
    const {internships} = await employeeModel.findById(req.id).populate('internships').exec()
    res.status(201).json(internships)
})

// employee job controllers

exports.createJob = catchAsyncErrors(async function (req, res, next) {
    const employee = await employeeModel.findById(req.id).exec();
    if (!employee) {
        return next(new ErrorHandler("Employee not found.", 500));
    }
    const job = await new jobModel(req.body).save();
    employee.jobs.push(job._id);
    job.employee=employee._id;
    employee.save();
    job.save();
    res.status(201).json(job);
})

exports.readSingleJob = catchAsyncErrors(async function (req, res, next) {
    const job = await jobModel.findById(req.params.id).exec()
    res.status(201).json(job)
})

exports.readJobs = catchAsyncErrors(async function (req, res, next) {
    const {jobs} = await employeeModel.findById(req.id).populate('jobs').exec()
    res.status(201).json(jobs)
})