const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(401)
        throw new Error('You must fill in all fields!')
    }

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, passConfirm } = req.body

    if (name === '' || email === '' || password === '' || passConfirm === '') {
        res.status(400)
        throw new Error('You must fill in all fields')
    }

    if (password !== passConfirm) {
        res.status(400)
        throw new Error("Passwords doesn't matches")
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const fetchUsers = asyncHandler ( async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const deleteUser = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({
            message: 'User removed'
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

const getUserByID = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

const updateUser = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.params.id)
    const { name, email, isAdmin } = req.body;

    if (!name || !email) {
        res.status(400);
        throw new Error('You must fill in all fields!');
    }
    
    const emailExists = await User.findOne({ _id: {$ne: user._id}, email });
    
    if (emailExists) {
        res.status(400);
        throw new Error('Email is already taken!');
    }
    
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.isAdmin = isAdmin;
    
        const updatedUser = await user.save();
    
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
})

module.exports = { authUser, getUser, registerUser, fetchUsers, deleteUser, getUserByID, updateUser }

