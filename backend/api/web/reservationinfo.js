const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:resID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of reservation!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM reservation,book,users
            WHERE reservation.reservation_id = ? AND reservation.isbn=book.isbn AND reservation.school_id=book.school_id AND reservation.user_id=users.user_id`,
        [req.params.resID]
      );

      let json_q = {
        resID: results[0].reservation_id,
        username: results[0].username,
        book: results[0].title,
        placed_at: results[0].reservation_datetime,
        isbn: results[0].isbn,
        userID: results[0].user_id,
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
