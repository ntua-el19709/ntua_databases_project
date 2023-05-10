const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid/:isbn", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of book!",
    async (conn) => {
      const results = await conn.query(
        `SELECT * FROM book,book_author,author
            WHERE book.school_id = ? AND book.isbn = ? AND  book.school_id = book_author.school_id AND book.isbn = book_author.isbn AND book_author.author_id = author.author_id`,
        [req.params.schlid, req.params.isbn]
      );

      let json_q = {
        isbn: req.params.isbn,
        schoolID: req.params.schlid,
        title: results[0].title,
        publisher: results[0].publisher,
        pages: results[0].pages,
        sumary: results[0].summary,
        image: results[0].image,
        language: results[0].lang,
        copies: results[0].copies,
        authors: [],
      };

      for (elem of results) {
        json_q.authors.push({
          authorID: elem.author_id,
          author_fullname: elem.author_fullname,
        });
      }

      if (req.query.format == "csv") {
        return new Parser().parse(json_q);
      } else {
        return json_q;
      }
    }
  );
});

module.exports = router;
