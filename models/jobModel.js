
const mongoose = require('mongoose')

const jobModel = new mongoose.Schema(
    {
        profile:String,
        employee:{type:mongoose.Schema.Types.ObjectId,ref:"employee"},
        appliers:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
        skills:String,
        jobType:{type:String,enum:['In Office','Remote']},
        openings:Number,
        assesments:String,
        perks:String,
        salary:String,
        description:String,
        perferences:String,
    }
    , { timestamps: true }
)


module.exports = mongoose.model("job", jobModel)