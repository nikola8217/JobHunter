const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/users')
const levels = require('./data/levels')
const technologies = require('./data/technologies')
const companies = require('./data/companies')
const Application = require('./models/Application')
const Company = require('./models/Company')
const Job = require('./models/Job')
const Level = require('./models/Level')
const Technology = require('./models/Technology')
const User = require('./models/User')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Company.deleteMany()
        await Level.deleteMany()
        await Technology.deleteMany()
        await User.deleteMany()

        await Company.insertMany(companies)
        await Level.insertMany(levels)
        await Technology.insertMany(technologies),
        await User.insertMany(users)

        console.log('Data imported!')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Company.deleteMany()
        await Level.deleteMany()
        await Technology.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed!')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}