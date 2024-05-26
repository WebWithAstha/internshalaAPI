
const mongoose = require('mongoose')

const studentModel = new mongoose.Schema(
    {
        email: {
            unique: true,
            type: String,
            required: [true, "Email address is required."],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address."
            ]
        },
        password: {
            type: String,
            select:false,
            required: [true, "Password is required."],
            minLength:[6,"Password must have at least 6 characters"],
            maxLength:[15,"Password must not exceed 15 characters"],
            // match: []
        }
    }
    ,{ timestamps: true }
)
module.exports = mongoose.model("student",studentModel)