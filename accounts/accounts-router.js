const express = require('express');
const knex = require('knex');

const db = require('../data/dbConfig.js');

const dbConnection = knex({
    client: 'sqlite3',
    connection: {
        filename: './data/budget.db3'
    },
    useNullAsDefault: true
});

const router = express.Router();




module.exports = router;