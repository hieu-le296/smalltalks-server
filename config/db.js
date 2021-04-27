const mysql = require('mysql');

const connectPool = mysql.createPool({
  pool : process.env.DB_POOL,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

module.exports = connectPool;
