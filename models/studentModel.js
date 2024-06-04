
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
            select: false,
            required: [true, "Password is required."],
            minLength: [6, "Password must have at least 6 characters"],
            maxLength: [15, "Password must not exceed 15 characters"],
            // match: []
        },
        resetPassword: {
            type:Number,
            default: 0,
        }
    }
    , { timestamps: true }
)

// encrypting password before saving to db
studentModel.pre("save", function () {
    if (!this.isModified("password")) {
        return
    }
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

// creating method to compare password
studentModel.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password)
}

// creating method to generate jwt token
studentModel.methods.generateJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
}

module.exports = mongoose.model("student", studentModel)