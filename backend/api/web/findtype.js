const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:username", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "User type found!",
    async (conn) => {
      const results = await conn.query(
        `SELECT users.user_id, operator.school_id, '1' AS type
        FROM operator
        JOIN users ON operator.user_id = users.user_id
        WHERE users.username = ?
        UNION
        SELECT users.user_id, professor.school_id, '2' AS type
        FROM professor
        JOIN users ON professor.user_id = users.user_id
        WHERE users.username = ?
        UNION
        SELECT users.user_id, student.school_id, '3' AS type
        FROM student
        JOIN users ON student.user_id = users.user_id
        WHERE users.username = ?`,
        [req.params.username, req.params.username, req.params.username]
      );

      let json_q = {
        userID: 1,
        type: "4", //topoperator
        schlID: "ALL",
      };

      if (results.length !== 0) {
        json_q = {
          userID: results[0].user_id,
          type: results[0].type, //1 for operator, 2 for professor, 3 for student
          schlID: results[0].school_id,
        };
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
