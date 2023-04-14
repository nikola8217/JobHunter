const express = require('express')
const { fetchJobs, 
        getJob,
        deleteJob,
        createJob,
        updateJob,
        fetchJobsByCompany } = require('../controllers/jobController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(fetchJobs).post(protect, admin, createJob)
router.route('/:id').get(getJob)
    .delete(protect, admin, deleteJob)
    .put(protect, admin, updateJob)
router.route('/jobsByCompany/:id').get(fetchJobsByCompany)


module.exports = router