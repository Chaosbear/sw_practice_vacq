const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB()

const hospitals = require('./routes/hospitals')

const app = express()

app.use(express.json())

app.use('/api/v1/hospitals', hospitals)

const port = process.env.PORT || 5000

const server = app.listen(port, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})