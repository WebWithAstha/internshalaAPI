require('dotenv').config()
const express  = require('express')
const app = express()




// logger setup
const logger = require('morgan')
app.use(logger("tiny"))

// route
app.use('/',require('./routes/indexRouters.js'))

// error handler
const ErrorHandler = require('./utils/ErrorHandler.js')
const { generatedError } = require('./middlewares/error.js')
app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`Requested URL not found: ${req.url}`,404))
})
app.use(generatedError)


app.listen(process.env.PORT,console.log(`server running on port ${process.env.PORT}`))