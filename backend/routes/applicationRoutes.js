const express = require('express')
const { application, checkApplication, getApplicatonsByUser } = require('../controllers/applicationController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, application).get(protect, checkApplication)
router.route('/:id').get(protect, getApplicatonsByUser)

module.exports = router