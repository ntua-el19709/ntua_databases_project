const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid/:userID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of reservations!",
    async (conn) => {
      const results = await conn.query(
        `SELECT reservation.reservation_id, book.title
        FROM reservation
        INNER JOIN book ON reservation.isbn = book.isbn AND reservation.school_id = book.school_id
        WHERE reservation.school_id = ? 
            AND reservation.user_id = ? 
            AND book.school_id = ? 
            AND reservation.isold = false 
            AND TIMESTAMPDIFF(DAY, reservation.reservation_datetime, NOW()) BETWEEN 0 AND 6`,
        [req.params.schlid, req.params.userID, req.params.schlid]
      );

      let json_q = {
        reservation: [],
      };

      for (elem of results) {
        json_q.reservation.push({
          reservationID: elem.reservation_id,
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
