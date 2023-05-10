const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:fullname", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Author added!",
    async (conn1, conn2) => {
      await conn1.query("INSERT INTO author (author_fullname) VALUES (?)", [
        req.params.fullname,
      ]);
    }
  );
});

module.exports = router;
