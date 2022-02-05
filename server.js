const express = require('express')
const dotenv = require('dotenv')

const hospitals = require('./routes/hospitals')

dotenv.config({path: './config/config.env'})

const app =express()

app.use('/api/v1/hospitals', hospitals)

const port = process.env.PORT || 5000

app.listen(port, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)