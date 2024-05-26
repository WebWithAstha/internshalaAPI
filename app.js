require('dotenv').config()
const express  = require('express')
const app = express()




// db connection
require('./models/database.js').connectDatabase()

// logger setup
const logger = require('morgan')
app.use(logger("tiny"))

// body parser setup
app.use(express.json())
app.use(express.urlencoded({extended:false}))

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