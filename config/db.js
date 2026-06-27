const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    family: 4  // Force IPv4 agar tidak timeout di IPv6
});

module.exports = pool;
