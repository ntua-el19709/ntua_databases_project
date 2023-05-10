const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:schlid/:isbn", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Book deleted!",
    async (conn1, conn2) => {
      await conn1.query(
        "DELETE from book where book.school_id = ? AND book.isbn=?",
        [req.params.schlid, req.params.isbn]
      );
    }
  );
});

module.exports = router;
