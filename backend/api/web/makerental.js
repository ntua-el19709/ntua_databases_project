const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:userID/:isbn/:schlID", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Rental Made!",
    async (conn) => {
      await conn.query(
        "INSERT INTO rental (user_id, isbn, school_id, returned, rental_datetime) VALUES (?, ?, ?, false, NOW())",
        [req.params.userID, req.params.isbn, req.params.schlID]
      );
    }
  );
});

module.exports = router;
