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
        `SELECT * FROM book,book_author,author,book_category,category
            WHERE book.school_id = ? AND book.isbn = ? AND  book.school_id = book_category.school_id AND book.isbn = book_category.isbn AND book_category.category_id = category.category_id AND  book.school_id = book_author.school_id AND book.isbn = book_author.isbn AND book_author.author_id = author.author_id`,
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
        categories: [],
      };
      fauthor = -1;
      for (elem of results) {
        if (fauthor != elem.author_id) {
          fauthor = elem.author_id;
        } else continue;
        json_q.authors.push({
          authorID: elem.author_id,
          author_fullname: elem.author_fullname,
        });
      }
      fcat = -1;
      for (elem of results) {
        if (fcat === -1) {
          fcat = elem.category_id;
        } else if (fcat === elem.category_id) break;
        json_q.categories.push({
          categoryID: elem.category_id,
          category: elem.category_name,
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
