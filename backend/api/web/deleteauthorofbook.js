const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:isbn/:schlid/:author_id", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Author of book Deleted!",
    async (conn1) => {
      await conn1.query(
        "DELETE from book_author where book_author.isbn=? AND book_author.school_id = ? AND book_author.author_id = ?",
        [req.params.isbn, req.params.schlid, req.params.author_id]
      );
    }
  );
});

module.exports = router;
