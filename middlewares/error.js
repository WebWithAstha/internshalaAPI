exports.generatedError = function(err,req,res,next){
    const statusCode = err.statusCode || 500

    // handling user duplicacy
    if(err.name == "MongoServerError" && err.message.includes("E11000 duplicate key error")){
        err.message = "User with this email already exists"
    }

    res.status(statusCode).json({
        message: err.message,
        errName:err.name,
        // stack:err.stack
    })
}