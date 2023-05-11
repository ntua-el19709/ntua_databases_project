const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:userID/:isbn/:schlID", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Reservation Made!",
    async (conn) => {
      await conn.query(
        "INSERT INTO reservation (user_id, isbn, school_id, isold, reservation_datetime) VALUES (?, ?, ?, false, NOW())",
        [req.params.userID, req.params.isbn, req.params.schlID]
      );
    }
  );
});

module.exports = router;
