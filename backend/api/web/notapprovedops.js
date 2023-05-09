const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of approved operators!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM users,operator
            WHERE users.user_id = operator.user_id AND users.approved=false`
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
