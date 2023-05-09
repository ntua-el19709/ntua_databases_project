const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlunit", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of school!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM school
            WHERE school.school_id = ?`,
        [req.params.schlunit]
      );

      let json_q = {
        schoolID: results[0].school_id,
        schoolName: results[0].school_name,
        address: results[0].address,
        city: results[0].city,
        telephone: results[0].telephone,
        email: results[0].email,
        principal: results[0].principal_fullname,
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
