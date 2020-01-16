const express = require('express');
const router = express.Router();
const Users = require('./users-model.js');
// const bcrypt = require('bcryptjs');
const restrict = require('../auth/restrict.js')

router.get('/', restrict, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'There was an error retrieving users'})
        })
})


module.exports = router;