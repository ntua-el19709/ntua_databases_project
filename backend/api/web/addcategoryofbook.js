const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:isbn/:schlid/:category_id", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Category of book Added!",
    async (conn1, conn2) => {
      await conn1.query("INSERT INTO book_category VALUES (?,?, ?)", [
        req.params.isbn,
        req.params.schlid,
        req.params.category_id,
      ]);
    }
  );
});

module.exports = router;
