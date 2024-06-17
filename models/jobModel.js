
const mongoose = require('mongoose')

const jobModel = new mongoose.Schema(
    {
        profile:String,
        skills:String,
        jobType:{type:String,enum:['In Office','Remote']},
        openings:Number,
        assesments:String,
        perks:String,
        salary:String,
        description:String,
        perferences:String,
        stipend:{type:String,enum:['Fixed','Negotiable','Performance Based','Unpaid']},
    }
    , { timestamps: true }
)


module.exports = mongoose.model("job", jobModel)