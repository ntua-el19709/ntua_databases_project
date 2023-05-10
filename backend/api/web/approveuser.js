const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:username", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "User Approved!",
    async (conn1, conn2) => {
      await conn1.query(
        "UPDATE users SET approved=true where users.username = ?",
        [req.params.username]
      );
    }
  );
});

module.exports = router;
