const Company = require('../models/Company')
const asyncHandler = require('express-async-handler')

const fetchCompanies = asyncHandler( async (req, res) => {
    const { name } = req.query;
    const filter = {};

    if (name) {
        filter.name = name;
    }

    const companies = await Company.find(filter)
    res.json(companies)
})

const getCompany = asyncHandler ( async (req, res) => {
    const company = await Company.findById(req.params.id)

    if(company) {
        res.json(company)
    } else {
        res.status(404)
        throw new Error('Company not found')
    }
})

const deleteCompany = asyncHandler ( async (req, res) => {
    const company = await Company.findById(req.params.id)

    if (company) {
        await company.remove()
        res.json({
            message: 'Company removed'
        })
    } else {
        res.status(404)
        throw new Error('Company not found!')
    }
})

const createCompany = asyncHandler ( async (req, res) => {
    const { name, img, about, address, city, zip } = req.body

    if (!name || name === '' || !img || img === '' || !about || about === '' || !address || address === '' || !city || city === '' || !zip || zip === '' ) {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    const companyExists = await Company.findOne({name, address, city, zip})

    if (companyExists) {
        res.status(400)
        throw new Error('Company already exists!')
    }

    if (zip && isNaN(zip)) {
        res.status(400)
        throw new Error('Postal code must be number!')
    }

    const company = new Company({
        name: name,
        img: '/img/' + img,
        about: about,
        address: address,
        city: city,
        zip: zip
    })

    const createdCompany = await company.save()
    res.status(201).json(createdCompany)
})

const updateCompany = asyncHandler ( async (req, res) => {
    
    const company = await Company.findById(req.params.id)
    const { name, img, about, address, city, zip } = req.body

    if (name === '' || img === '' || about === '' || address === '' || city === '' || zip === '' ) {
        res.status(400)
        throw new Error('You must fill in all fields!')
    }

    if (isNaN(zip)) {
        res.status(400)
        throw new Error('Postal code must be number!')
    }

    if(company) {
        company.name = name
        company.img = img
        company.about = about
        company.address = address
        company.city = city
        company.zip = zip

        const updatedCompany = await company.save()
        res.json(updatedCompany)
    } else {
        res.status(404)
        throw new Error('Company not found!')
    }
})

module.exports = { fetchCompanies, getCompany, deleteCompany, createCompany, updateCompany }