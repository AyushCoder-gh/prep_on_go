const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "prep_on_go",
    password: "Ayush@psql",
    port: 5432,
});

module.exports = pool;