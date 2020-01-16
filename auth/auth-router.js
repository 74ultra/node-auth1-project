const express = require('express');
const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    Users.insert({ username, password: bcrypt.hashSync(password, 8) })
    .then(id => {
        res.status(201).json({ message: `User registered with an id of ${id}`})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: `There was an error registering the user: ${err}`})
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users
        .findByUserName(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                res.status(200).json({ message: 'Yay'})
            } else {
                res.status(401).json({ message: 'Something is not working'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Nope'})
        })
})

module.exports = router;