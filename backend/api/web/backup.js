const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const mysqldump = require("mysqldump");
const router = express.Router();

router.get("/", async (req, res) => {
  mysqldump({
    connection: {
      host: "localhost",
      user: "softenguser",
      password: "password",
      database: "libraries",
      charset: "utf8mb4",
      connectionLimit: 100,
      multipleStatements: true,
    },
    dumpToFile: "../database/dump.sql",
  });

  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Database backed up succesfully!",
    async (conn) => {
      let json_q = {
        message: "OK",
      };

      if (req.query.format == "csv") {
        return new Parser().parse(json_q);
      } else {
        return json_q;
      }
    }
  );
});

module.exports = router;
