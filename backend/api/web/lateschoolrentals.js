const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of late school rentals!",
    async (conn) => {
      const results = await conn.query(
        `SELECT rental.rental_id,users.username
        FROM rental
        JOIN users ON rental.user_id = users.user_id
        WHERE rental.school_id = ? AND rental.returned = false AND users.user_id = rental.user_id AND TIMESTAMPDIFF(DAY, rental.rental_datetime, NOW()) > 7
        ORDER BY rental.rental_datetime`,
        [req.params.schlid]
      );

      let json_q = {
        lateSchoolRentals: [],
      };

      for (elem of results) {
        json_q.lateSchoolRentals.push({
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
