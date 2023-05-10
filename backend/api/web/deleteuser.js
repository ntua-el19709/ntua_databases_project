const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:username", async (req, res) => {
  await apiutils.requestWrapper(
    post,
    req,
    res,
    "User deleted!",
    async (conn1, conn2) => {
      await conn1.query("DELETE from users where users.username = ?", [
        req.params.username,
      ]);
    }
  );
});

module.exports = router;
