const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Nikola Zivkovic',
        email: 'gileer404@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
]

module.exports = users 