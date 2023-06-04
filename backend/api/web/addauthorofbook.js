const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:isbn/:schlid/:author_id", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Author of book Added!",
    async (conn1) => {
      await conn1.query("INSERT INTO book_author VALUES (?,?, ?)", [
        req.params.isbn,
        req.params.schlid,
        req.params.author_id,
      ]);
    }
  );
});

module.exports = router;
