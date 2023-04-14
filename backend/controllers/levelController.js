const Level = require('../models/Level')
const asyncHandler = require('express-async-handler')

const fetchLevels = asyncHandler( async (req, res) => {
    const levels = await Level.find({})
    res.json(levels)
})

const getLevel = asyncHandler ( async (req, res) => {
    const level = await Level.findById(req.params.id)

    if(level) {
        res.json(level)
    } else {
        res.status(404)
        throw new Error('Level not found')
    }
})

const createLevel = asyncHandler ( async (req, res) => {
    const { name } = req.body

    if (!name || name === '') {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    const levelExists = await Level.findOne({ name })

    if (levelExists) {
        res.status(400)
        throw new Error('Level already exists!')
    }

    const level = new Level({
        name: name,
    })

    const createdLevel = await level.save()
    res.status(201).json(createdLevel)
})

const updateLevel = asyncHandler ( async (req, res) => {
    
    const level = await Level.findById(req.params.id)
    const { name } = req.body

    if (name === '') {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    const levelExists = await Level.findOne({ _id: {$ne: _id}, name })

    if (levelExists) {
        res.status(400)
        throw new Error('Level already exists!')
    }

    if(level) {
        level.name = name
        
        const updatedLevel = await level.save()
        res.json(updatedLevel)
    } else {
        res.status(404)
        throw new Error('Level not found!')
    }
})

const deleteLevel = asyncHandler ( async (req, res) => {
    const level = await Level.findById(req.params.id)

    if (level) {
        await level.remove()
        res.json({
            message: 'Level removed'
        })
    } else {
        res.status(404)
        throw new Error('Level not found!')
    }
})

module.exports = { fetchLevels, getLevel, createLevel, updateLevel, deleteLevel }