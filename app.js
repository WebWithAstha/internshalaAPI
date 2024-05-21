require('dotenv').config()
const express  = require('express')
const app = express()




// logger setup
const logger = require('morgan')
app.use(logger("tiny"))

// route
app.use('/',require('./routes/indexRouters.js'))


app.listen(process.env.PORT,console.log(`server running on port ${process.env.PORT}`))