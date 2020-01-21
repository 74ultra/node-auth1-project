const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/db.js');

const sessionConfig = {
    secret: 'test',
    name: 'thibodeau',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tablename: 'knexsessions',
        sidfieldname: 'sessionid',
        createTable: true,
        clearInterval: 1000 * 60 * 30
    })
}

const server = express();
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig)) // must be included before routers

const authRouter = require('./auth/auth-router.js');
server.use('/auth', authRouter)

const usersRouter = require('./users/users-router.js');
server.use('/users', usersRouter)

const port = 6000;
server.listen(port, () => console.log(`Server running on port ${port}`))