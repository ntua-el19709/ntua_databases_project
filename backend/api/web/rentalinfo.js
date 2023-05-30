const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:renID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of rental!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM rental,book,users
            WHERE rental.rental_id = ? AND rental.isbn=book.isbn AND rental.school_id=book.school_id AND rental.user_id=users.user_id`,
        [req.params.renID]
      );

      let json_q = {
        renID: results[0].rental_id,
        username: results[0].username,
        book: results[0].title,
        rent_at: results[0].rental_datetime,
        returned: results[0].returned,
        userID: results[0].user_id,
        isbn: results[0].isbn,
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
