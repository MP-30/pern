const {Pool} = require("pg");

// no need to mention the host, user, password, database, port pg will take it from the environment variables
const pool = new Pool();

module.exports = {
    query: (text, params) => pool.query(text, params),
};

