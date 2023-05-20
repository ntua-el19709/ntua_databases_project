const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:userID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of late user rentals!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM rental,book
            WHERE rental.user_id=? AND rental.returned=false AND book.school_id = rental.school_id AND book.isbn = rental.isbn AND TIMESTAMPDIFF(DAY,rental.rental_datetime,NOW()) > 6 `,
        [req.params.userID]
      );

      let json_q = {
        lateUserRentals: [],
      };

      for (elem of results) {
        json_q.lateUserRentals.push({
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