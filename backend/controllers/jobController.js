const Job = require('../models/Job')
const asyncHandler = require('express-async-handler')

const fetchJobs = asyncHandler( async (req, res) => {
    const { company, technology, level } = req.query;
    const filter = {};

    if (company) {
        filter.company = company;
    }

    if (technology) {
        filter.technology = technology;
    }

    if (level) {
        filter.level = level;
    }

    const jobs = await Job.find(filter).populate('company', 'name').populate('technology', 'name').populate('level', 'name')

    res.json(jobs)
    
})

const getJob = asyncHandler ( async (req, res) => {
    const job = await Job.findById(req.params.id).populate('company').populate('technology', 'name').populate('level', 'name')

    if(job) {
        res.json(job)
    } else {
        res.status(404)
        throw new Error('Job not found')
    }
})

const createJob = asyncHandler ( async (req, res) => {
    const { name, company, technology, level, about, requirements } = req.body

    if (!name || name === '' || !company|| company === '' || !technology || technology === '' || !level || level === '' || !about || about === '' || !requirements || requirements === '') {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    const job = new Job({
        name: name,
        company: company,
        technology: technology,
        level: level,
        about: about,
        requirements: requirements
    })

    const createdJob = await job.save()
    res.status(201).json(createdJob)
})

const updateJob = asyncHandler ( async (req, res) => {
    
    const job = await Job.findById(req.params.id)
    const { name, company, technology, level, about, requirements } = req.body

    if (name === '' || company === '' || technology === '' || level === '' || about === '' || requirements === '') {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    if(job) {
        job.name = name
        job.company = company
        job.technology = technology
        job.level = level 
        job.about = about
        job.requirements = requirements

        const updatedJob = await job.save()
        res.json(updatedJob)
    } else {
        res.status(404)
        throw new Error('Job not found!')
    }
})

const deleteJob = asyncHandler ( async (req, res) => {
    const job = await Job.findById(req.params.id)

    if (job) {
        await job.remove()
        res.json({
            message: 'Job removed'
        })
    } else {
        res.status(404)
        throw new Error('Job not found!')
    }
})

const fetchJobsByCompany = asyncHandler( async (req, res) => {
    console.log(req.params)
    const jobs = await Job.find({company: req.params.id}).populate('company', 'name').populate('technology', 'name').populate('level', 'name')
    res.json(jobs)
})

module.exports = { fetchJobs, getJob, createJob, updateJob, deleteJob, fetchJobsByCompany }