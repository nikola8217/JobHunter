const express = require('express')
const { fetchLevels, 
        getLevel,
        createLevel,
        updateLevel,
        deleteLevel } = require('../controllers/levelController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(fetchLevels).post(protect, admin, createLevel)
router.route('/:id').get(getLevel)
    .delete(protect, admin, deleteLevel)
    .put(protect, admin, updateLevel)


module.exports = router