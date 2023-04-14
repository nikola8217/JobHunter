const express = require('express')
const { authUser, 
    getUser, 
    registerUser, 
    fetchUsers, 
    deleteUser, 
    getUserByID, 
    updateUser } = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, fetchUsers) 
router.post('/login', authUser)
router.route('/profile').get(protect, getUser)
router.route('/:id').delete(protect, admin, deleteUser)
    .get(protect, getUserByID)
    .put(protect, admin, updateUser)


module.exports = router