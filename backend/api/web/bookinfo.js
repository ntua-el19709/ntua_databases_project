const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
      return true;
    }
  }

  return false;
}

router.get("/:schlid/:isbn", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of book!",
    async (conn) => {
      const results = await conn.query(
        `SELECT book.*, author.*, category.*
        FROM book
        JOIN book_author ON book.school_id = book_author.school_id AND book.isbn = book_author.isbn
        JOIN author ON book_author.author_id = author.author_id
        JOIN book_category ON book.school_id = book_category.school_id AND book.isbn = book_category.isbn
        JOIN category ON book_category.category_id = category.category_id
        WHERE book.school_id = ? AND book.isbn = ?`,
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

      var authors = [];
      for (elem of results) {
        authors.push({
          authorID: elem.author_id,
          author_fullname: elem.author_fullname,
        });
      }
      for (elem of authors) {
        if (containsObject(elem, json_q.authors) === false)
          json_q.authors.push(elem);
      }
      var cats = [];
      for (elem of results) {
        cats.push({
          categoryID: elem.category_id,
          category: elem.category_name,
        });
      }
      for (elem of cats) {
        if (containsObject(elem, json_q.categories) === false)
          json_q.categories.push(elem);
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
