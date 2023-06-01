const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:username", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Username checked",
    async (conn) => {
      const results = await conn.query(
        `SELECT users.username FROM users
            WHERE users.username = ?`,
        [req.params.username]
      );

      message = "Unique";
      if (results.length === 1) {
        validated = false;
        message = "username already in use!";
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
