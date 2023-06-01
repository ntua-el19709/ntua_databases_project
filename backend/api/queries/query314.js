const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.1.4 executed succesfully!",
    async (conn) => {
      const ans_list = await conn.query(
        `SELECT author.author_fullname AS author
        FROM author
        INNER JOIN book_author ON author.author_id = book_author.author_id
        INNER JOIN book ON book_author.isbn = book.isbn AND book_author.school_id = book.school_id
        LEFT JOIN rental ON book.isbn = rental.isbn AND book.school_id = rental.school_id
        WHERE rental.rental_id IS NULL`
      );

      json_res = [];
      for (elem of ans_list) {
        json_res.push(elem.author);
      }

      return json_res;
    }
  );
});

module.exports = router;
