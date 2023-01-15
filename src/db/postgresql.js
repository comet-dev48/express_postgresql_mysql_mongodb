const Pool = require('pg').Pool;
const config = require('../config/config');

const pool = new Pool({
    host: config.postgresql.host,
    port: config.postgresql.port,
    user: config.postgresql.username,
    password: config.postgresql.password,
    database: config.postgresql.db,
});

module.exports = pool;