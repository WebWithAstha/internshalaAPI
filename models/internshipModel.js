
const mongoose = require('mongoose')

const internshipModel = new mongoose.Schema(
    {
        profile:String,
        skills:String,
        internshipType:{type:String,enum:['In Office','Remote']},
        openings:Number,
        from:String,
        to:String,
        duration:String,
        responsibility:String,
        stipend:{type:String,enum:['Fixed','Negotiable','Performance Based','Unpaid']},
    }
    , { timestamps: true }
)


module.exports = mongoose.model("internship", internshipModel)