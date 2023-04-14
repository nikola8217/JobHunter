const express = require('express')
const { fetchTechnologies, 
        getTechnology,
        createTechnology,
        updateTechnology,
        deleteTechnology } = require('../controllers/technologyController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(fetchTechnologies).post(protect, admin, createTechnology)
router.route('/:id').get(getTechnology)
    .delete(protect, admin, deleteTechnology)
    .put(protect, admin, updateTechnology)


module.exports = router