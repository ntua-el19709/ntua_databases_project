const mysql = require("promise-mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "softenguser",
  database: "libraries",
  charset: "utf8mb4",
  password: "password",
  connectionLimit: 100,
  multipleStatements: true,
});
// }

module.exports = pool;
