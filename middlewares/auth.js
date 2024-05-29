const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to proceed further.",401))
    }
    const {id} = jwt.verify(token,process.env.JWT_SECRET)
    req.id = id
    next()

})