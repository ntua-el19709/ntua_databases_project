const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:username/:schlunit", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Operator Added!",
    async (conn1) => {
      await conn1.query(
        "INSERT INTO operator VALUES ((select user_id from users where username = ?), ?)",
        [req.params.username, req.params.schlunit, 0]
      );
    }
  );
});

module.exports = router;
