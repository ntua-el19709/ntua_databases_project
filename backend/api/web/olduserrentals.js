const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:userID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of old user rentals!",
    async (conn) => {
      const results = await conn.query(
        `SELECT rental.rental_id,book.title
        FROM rental
        INNER JOIN book ON rental.school_id = book.school_id AND rental.isbn = book.isbn
        WHERE rental.user_id = ? AND rental.returned = true
        ORDER BY rental.rental_datetime`,
        [req.params.userID]
      );

      let json_q = {
        oldUserRentals: [],
      };

      for (elem of results) {
        json_q.oldUserRentals.push({
          renID: elem.rental_id,
          book: elem.title,
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
