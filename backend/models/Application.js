const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    },
    {
        timestamps: true
    }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
