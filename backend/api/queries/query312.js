const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:catID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.1.2 executed succesfully!",
    async (conn) => {
      const ans_list = await conn.query(
        `SELECT author.author_fullname AS author, 0 AS professor
        FROM category
        INNER JOIN book_category ON category.category_id = book_category.category_id
        INNER JOIN book ON book_category.school_id = book.school_id AND book_category.isbn = book.isbn
        INNER JOIN book_author ON book.isbn = book_author.isbn AND book.school_id = book_author.school_id
        INNER JOIN author ON book_author.author_id = author.author_id
        WHERE category.category_id = ?
        
        UNION
        
        SELECT 0 AS author, users.user_fullname AS professor
        FROM category
        INNER JOIN book_category ON category.category_id = book_category.category_id
        INNER JOIN book ON book_category.school_id = book.school_id AND book_category.isbn = book.isbn
        INNER JOIN rental ON book.isbn = rental.isbn AND book.school_id = rental.school_id
        INNER JOIN users ON rental.user_id = users.user_id
        INNER JOIN professor ON users.user_id = professor.user_id
        WHERE category.category_id = ? AND TIMESTAMPDIFF(YEAR, rental.rental_datetime, NOW()) < 1`,
        [req.params.catID, req.params.catID]
      );

      json_res = {
        authors: [],
        professors: [],
      };
      for (elem of ans_list) {
        if (elem.author === "0") json_res.professors.push(elem.professor);
        else json_res.authors.push(elem.author);
      }

      return json_res;
    }
  );
});

module.exports = router;
