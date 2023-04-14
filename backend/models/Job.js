const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Company'
        },
        technology: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Technology',
        },
        level: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Level',
        },
        about: {
            type: String,
            required: true
        },
        requirements: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
    }
)

const Job = mongoose.model('Job', jobSchema)

module.exports = Job