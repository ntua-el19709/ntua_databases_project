const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post(
  "/:isbn/:schlid/:title/:publisher/:pages/:summary/:lang/:copies",
  async (req, res) => {
    await apiutils.requestWrapper(
      false,
      req,
      res,
      "Book info Changed!",
      async (conn) => {
        await conn.query(
          "UPDATE book SET title=?,publisher=?,pages=?,summary=?,lang=?,copies=? WHERE book.school_id=? AND book.isbn=?",
          [
            req.params.title,
            req.params.publisher,
            req.params.pages,
            req.params.summary,
            req.params.lang,
            req.params.copies,
            req.params.schlid,
            req.params.isbn,
          ]
        );
      }
    );
  }
);

module.exports = router;
