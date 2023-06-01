const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of approved users!",
    async (conn) => {
      const results = await conn.query(
        `((SELECT users.user_id, users.username
          FROM users
          JOIN student ON users.user_id = student.user_id
          WHERE student.school_id = ? AND users.approved = true)
          UNION
          (SELECT users.user_id, users.username
          FROM users
          JOIN professor ON users.user_id = professor.user_id
          WHERE professor.school_id = ? AND users.approved = true))
          ORDER BY username`,
        [req.params.schlid, req.params.schlid]
      );

      let json_q = {
        approvedUsers: [],
      };

      for (elem of results) {
        json_q.approvedUsers.push({
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
