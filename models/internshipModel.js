
const mongoose = require('mongoose')

const internshipModel = new mongoose.Schema(
    {
        profile:String,
        employee:{type:mongoose.Schema.Types.ObjectId,ref:"employee"},
        appliers:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
        skills:String,
        internshipType:{type:String,enum:['In Office','Remote']},
        openings:Number,
        from:String,
        to:String,
        duration:String,
        responsibility:String,
        stipend:{
            status:{
                type:String,enum:['Fixed','Negotiable','Performance Based','Unpaid']},
            },
            amount:Number,
    }
    , { timestamps: true }
)


module.exports = mongoose.model("internship", internshipModel)