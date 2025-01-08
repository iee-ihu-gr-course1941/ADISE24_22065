const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'ataxx',
    password: 'password',
    port: 5432,
});

module.exports = pool;
