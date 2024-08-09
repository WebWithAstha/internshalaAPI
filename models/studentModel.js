
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentModel = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: [true, "First name is required."],
            maxLength: [15, "First name must not exceed 15 characters"],
            minLength: [3, "First name should have atleast 3 characters"],
        },
        lastname:{
            type: String,
            required: [true, "Last name is required."],
            maxLength: [15, "Last name must not exceed 15 characters"],
            minLength: [3, "Last name should have atleast 3 characters"],
        },
        contact:{
            type: String,
            required: [true, "Contact is required."],
            maxLength: [10, "Contact must not exceed 10 characters"],
            minLength: [10, "Contact should have atleast 10 characters"],
        },
        city:{
            type: String,
            required: [true, "City is required."],
        },
        gender:{
            type: String,
            required: [true, "Gender is required."],
            enum: ["Male", "Female"]
        },
        avatar:{
            type:Object,
            default:{
                fileId:'',
                url:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        resume:{
            education:[],
            experience:[],
            internships:[{type:mongoose.Schema.Types.ObjectId,ref:"internship"}],
            jobs:[{type:mongoose.Schema.Types.ObjectId,ref:"job"}],
            responsibility:[],
            courses:[],
            projects:[],
            skills:[],
            works:[],
            accomplishment:[],
        },
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
studentModel.pre("save", function (next) {
    console.log("hello")
    if(this.password && this.isModified('password')) {
        try {
            console.log(this.password)
            let salt = bcrypt.genSaltSync(10)
            this.password = bcrypt.hashSync(this.password,salt)
        } catch (error) {
            console.log(error)
            return next(error)
            
        }
    }
    next();
})

// creating method to compare password
studentModel.methods.comparePassword = async function (password) {
    return bcrypt.compareSync(password, this.password)
}

// creating method to generate jwt token
studentModel.methods.generateJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
}

module.exports = mongoose.model("student", studentModel)