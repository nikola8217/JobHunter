const Application = require('../models/Application')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const application = asyncHandler ( async (req, res) => {
    const { userId, name, email, job } = req.body

    if (!userId || userId === '' || !name || name === '' ||  !email || email === '' || !job || job === '' ) {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    const userExists = await User.findOne({_id: userId, name, email})

    if(!userExists) {
        res.status(400)
        throw new Error('Invalid data!')
    }

    const alreadyApplied = await Application.findOne({userId, job})

    if (alreadyApplied) {
        res.status(400)
        throw new Error('You have already applied!')
    }

    const application = new Application({
        userId,
        name,
        email,
        job
    })

    const createdApplication = await application.save()
    res.status(201).json(createdApplication)
})

const checkApplication = asyncHandler ( async (req,res) => {
    const { user, job } = req.query

    const alreadyApplied = await Application.findOne({userId: user, job}).lean()
    res.status(201).json(alreadyApplied)
})

const getApplicatonsByUser = asyncHandler ( async (req,res) => {
    const applications = await Application.find({ userId: req.params.id })
    .populate({
      path: 'job',
      populate: {
        path: 'company',
        model: 'Company'
      }
    })

    applications.forEach(app => {
        app.createdAt = new Date(app.createdAt).toISOString().substring(0, 10) 
    });

    res.status(201).json(applications)
    
})

module.exports = { application, checkApplication, getApplicatonsByUser }
