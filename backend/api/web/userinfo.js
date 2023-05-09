const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:username", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of question!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM users
            WHERE users.username = ?`,
        [req.params.username]
      );

      let json_q = {
        userID: results[0].user_id,
        username: req.params.username,
        password: results[0].passwrd,
        fullname: results[0].user_fullname,
        dob: results[0].date_of_birth,
        approved: results[0].approved,
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
