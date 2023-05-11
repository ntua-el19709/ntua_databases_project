const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:username", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "User Unapproved!",
    async (conn) => {
      await conn.query(
        "UPDATE users SET approved=false where users.username = ?",
        [req.params.username]
      );
    }
  );
});

module.exports = router;
