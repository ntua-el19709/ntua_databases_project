const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:renID", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Rent book Returned!",
    async (conn) => {
      await conn.query(
        "UPDATE rental SET returned=true where rental.rental_id=?",
        [req.params.renID]
      );
    }
  );
});

module.exports = router;
