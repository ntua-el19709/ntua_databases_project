const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:revID", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Review deleted!",
    async (conn1, conn2) => {
      await conn1.query("DELETE from review where review.review_id = ?", [
        req.params.revID,
      ]);
    }
  );
});

module.exports = router;
