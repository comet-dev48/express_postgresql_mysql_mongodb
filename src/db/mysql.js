const mysql = require('mysql');
const config = require('../config/config');

const db = mysql.createConnection({
    host: config.mysql.host,
    username: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.db
});

module.exports = db;