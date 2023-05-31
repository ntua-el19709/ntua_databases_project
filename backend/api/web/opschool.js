const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:opid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of school!",
    async (conn) => {
      const results = await conn.query(
        `SELECT school.school_id,school.school_name
        FROM school
        INNER JOIN operator ON operator.school_id = school.school_id
        WHERE operator.user_id = ?`,
        [req.params.opid]
      );

      let json_q = {
        schoolID: results[0].school_id,
        schoolName: results[0].school_name,
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
