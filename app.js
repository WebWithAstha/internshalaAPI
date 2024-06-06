require('dotenv').config()
const express = require('express')
const app = express()




// db connection
require('./models/database.js').connectDatabase()

// logger setup
const logger = require('morgan')
app.use(logger("tiny"))

// body parser setup
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// session & cookie setup
const session = require('express-session')
const cookieParser = require('cookie-parser')
app.use(session(
    {
        saveUninitialized: false,
        resave: false,
        secret: process.env.SESSION_SECRET,
    }
))
app.use(cookieParser())

// fileupload setup
const fileupload = require('express-fileupload')
app.use(fileupload())

// route
app.use('/', require('./routes/indexRouters.js'))
app.use('/resume', require('./routes/remsumeRouter.js'))

// error handler
const ErrorHandler = require('./utils/ErrorHandler.js')
const { generatedError } = require('./middlewares/error.js')
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Requested URL not found: ${req.url}`, 404))
})
app.use(generatedError)


app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`))