const express = require('express')
const { fetchCompanies, 
        getCompany,
        deleteCompany,
        createCompany,
        updateCompany } = require('../controllers/companyController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(fetchCompanies).post(protect, admin, createCompany)
router.route('/:id').get(getCompany)
    .delete(protect, admin, deleteCompany)
    .put(protect, admin, updateCompany)


module.exports = router