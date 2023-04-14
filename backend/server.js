const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const companyRoutes = require('./routes/companyRoutes')
const userRoutes = require('./routes/userRoutes')
const technologyRoutes = require('./routes/technologyRoutes')
const levelRoutes = require('./routes/levelRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')
// const bodyParser = require('body-parser');

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/companies', companyRoutes)
app.use('/api/users', userRoutes)
app.use('/api/technologies', technologyRoutes)
app.use('/api/levels', levelRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))