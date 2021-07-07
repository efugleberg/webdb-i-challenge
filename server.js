const express = require('express');

const AccountsRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>Do not forget the homies!</h3>');
})

module.exports = server;