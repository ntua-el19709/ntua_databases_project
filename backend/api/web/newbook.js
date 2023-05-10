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
      "Book Added!",
      async (conn) => {
        await conn.query(
          "INSERT INTO book (isbn, school_id, title, publisher, pages, summary,lang,copies) VALUES (?,?,?, ?, ?, ?, ?, ?)",
          [
            req.params.isbn,
            req.params.schlid,
            req.params.title,
            req.params.publisher,
            req.params.pages,
            req.params.summary,
            req.params.lang,
            req.params.copies,
          ]
        );
      }
    );
  }
);

module.exports = router;
