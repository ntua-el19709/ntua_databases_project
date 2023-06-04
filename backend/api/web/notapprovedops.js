const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of not approved operators!",
    async (conn) => {
      const results = await conn.query(
        `SELECT users.user_id,users.username
        FROM users
        INNER JOIN operator ON users.user_id = operator.user_id
        WHERE users.approved = false
        ORDER BY users.username`
      );

      let json_q = {
        notApprovedOperators: [],
      };

      for (elem of results) {
        json_q.notApprovedOperators.push({
          userID: elem.user_id,
          username: elem.username,
        });
      }

      if (req.query.format == "csv") {
        return new Parser().parse(json_q);
      } else {
        return json_q;
      }
    }
  );
});

module.exports = router;
