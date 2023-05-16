const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:username/:password", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "User validation",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM users
            WHERE users.username = ?`,
        [req.params.username]
      );

      validated = true;
      message = "Validated";
      if (results.length === 0) {
        validated = false;
        message = "User Not Found!";
      } else {
        if (results[0].passwrd != req.params.password) {
          validated = false;
          message = "Wrong Password!";
        }
        if (results[0].approved === 0) {
          validated = false;
          message = "User Not Approved!";
        }
      }

      let json_q = {
        message: message,
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
