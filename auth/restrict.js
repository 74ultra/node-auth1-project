const bcrypt = require('bcryptjs')
const Users = require('../users/users-model.js')


module.exports = (req, res, next) => {
    const { username, password } = req.headers;
    Users
        .findByUserName(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                next()
            } else {
                res.status(403).json({ message: "Not Authorized"})
            }
        })
        .catch(err => {
            console.log('Here is an non-authorization error', err)
            res.status(500).json({ message: "Error verifying user"})
        })


}

