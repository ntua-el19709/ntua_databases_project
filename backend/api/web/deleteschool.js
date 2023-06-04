const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "School deleted!",
    async (conn1) => {
      await conn1.query("DELETE from school where school.school_id = ?", [
        req.params.schlid,
      ]);
    }
  );
});

module.exports = router;
