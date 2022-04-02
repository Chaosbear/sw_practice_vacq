const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB()

const hospitals = require('./routes/hospitals')
const appointments = require('./routes/appointments')
const auth = require('./routes/auth')

const app = express()

app.use(express.json())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(cors())

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1
})
app.use(limiter)

app.use(cookieParser())
app.use('/api/v1/hospitals', hospitals)
app.use('/api/v1/appointments', appointments)
app.use('/api/v1/auth', auth)

const port = process.env.PORT || 5000

const server = app.listen(port, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})