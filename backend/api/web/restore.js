const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const mysqldump = require("mysqldump");
const fs = require("fs");
const router = express.Router();

router.get("/", async (req, res) => {
  const init = fs.readFileSync("../database/init.sql").toString();
  const dump = fs.readFileSync("../database/dump.sql").toString();

  const restore = init + "\n" + dump;
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Database restored succesfully!",
    async (conn) => {
      let json_q = {
        message: "OK",
      };
      const results = await conn.query(restore, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send(json_q);
        }
      });
      if (req.query.format == "csv") {
        return new Parser().parse(json_q);
      } else {
        return json_q;
      }
    }
  );
});

module.exports = router;
