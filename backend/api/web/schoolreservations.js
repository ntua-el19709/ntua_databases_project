const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of reservations!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM reservation,users
            WHERE reservation.school_id = ? AND reservation.user_id = users.user_id AND reservation.isold =false AND (TIMESTAMPDIFF(DAY,reservation.reservation_datetime,NOW()) between 0 and 6)`,
        [req.params.schlid]
      );

      let json_q = {
        reservation: [],
      };

      for (elem of results) {
        json_q.reservation.push({
          reservationID: elem.reservation_id,
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
