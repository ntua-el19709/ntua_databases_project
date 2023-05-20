const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of old school rentals!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM rental,users
            WHERE rental.school_id=? AND rental.returned=true AND users.user_id = rental.user_id`,
        [req.params.schlid]
      );

      let json_q = {
        oldSchoolRentals: [],
      };

      for (elem of results) {
        json_q.oldSchoolRentals.push({
          renID: elem.rental_id,
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