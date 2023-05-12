const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:revID", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Review Approved!",
    async (conn) => {
      await conn.query(
        "UPDATE review SET approved=true where review.review_id=?",
        [req.params.revID]
      );
    }
  );
});

module.exports = router;
