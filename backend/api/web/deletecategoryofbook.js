const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:isbn/:schlid/:category_id", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Category of book Added!",
    async (conn1) => {
      await conn1.query(
        "DELETE from book_category where book_category.isbn=? AND book_category.school_id = ? AND book_category.category_id = ?",
        [req.params.isbn, req.params.schlid, req.params.category_id]
      );
    }
  );
});

module.exports = router;
