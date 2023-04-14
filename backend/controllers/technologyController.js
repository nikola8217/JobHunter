const Technology = require('../models/Technology')
const asyncHandler = require('express-async-handler')

const fetchTechnologies = asyncHandler( async (req, res) => {
    const technologies = await Technology.find({})
    res.json(technologies)
})

const getTechnology = asyncHandler ( async (req, res) => {
    const technology = await Technology.findById(req.params.id)

    if(technology) {
        res.json(technology)
    } else {
        res.status(404)
        throw new Error('Technology not found')
    }
})

const createTechnology = asyncHandler ( async (req, res) => {
    const { name } = req.body

    if (!name || name === '') {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    const technologyExists = await Technology.findOne({ name })

    if (technologyExists) {
        res.status(400)
        throw new Error('Technology already exists!')
    }

    const technology = new Technology({
        name: name,
    })

    const createdTechnology = await technology.save()
    res.status(201).json(createdTechnology)
})

const updateTechnology = asyncHandler ( async (req, res) => {
    
    const technology = await Technology.findById(req.params.id)
    const { _id, name } = req.body

    if (name === '') {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    const technologyExists = await Technology.findOne({ _id: {$ne: _id}, name })

    if (technologyExists) {
        res.status(400)
        throw new Error('Technology already exists!')
    }

    if(technology) {
        technology.name = name
        
        const updatedTechnology = await technology.save()
        res.json(updatedTechnology)
    } else {
        res.status(404)
        throw new Error('Technology not found!')
    }
})

const deleteTechnology = asyncHandler ( async (req, res) => {
    const technology = await Technology.findById(req.params.id)

    if (technology) {
        await technology.remove()
        res.json({
            message: 'Technology removed'
        })
    } else {
        res.status(404)
        throw new Error('Technology not found!')
    }
})

module.exports = { fetchTechnologies, getTechnology, createTechnology, updateTechnology, deleteTechnology }