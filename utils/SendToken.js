const ErrorHandler = require("./ErrorHandler");

exports.sendToken = (student, statusCode, res) => {
    const token = student.generateJwtToken();

    // cookie options
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 1000 * 60 * 60 * 24),
        httpOnly: true,
        // secure: true
    }
    res.status(statusCode).cookie("token", token, options).json({success:true,id:student._id,token})

}