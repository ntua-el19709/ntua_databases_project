const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:resID", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Reservation Deleted!",
    async (conn) => {
      await conn.query(
        "UPDATE reservation SET isold=true where reservation.reservation_id=?",
        [req.params.resID]
      );
    }
  );
});

module.exports = router;
