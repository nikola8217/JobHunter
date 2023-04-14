const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String, 
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            requred: true
        }

    }, 
    {
        timestamps: true
    }
)

const Company = mongoose.model('Company', companySchema)

module.exports = Company 