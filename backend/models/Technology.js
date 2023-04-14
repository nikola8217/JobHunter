const mongoose = require('mongoose')

const technologySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true
    }
)

const Technology = mongoose.model('Technology', technologySchema)

module.exports = Technology