const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");


// async error handled using trycatch

/*exports.homePage = async function(req,res){
    try {
        res.status(200).json({message:"homepage"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}*/


exports.homePage = catchAsyncErrors(async function(req,res){
    res.status(200).json({message:"homepage"})
})