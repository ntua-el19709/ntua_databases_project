const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:catID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.1.1 executed succesfully!",
    async (conn) => {
      let year = "%";
      if (req.params.year !== "none") year = req.params.year + year;
      let month = "%";
      if (req.params.month !== "none") month = req.params.month + month;
      if (month[0] == "0") month = month[1];

      const ans_list = await conn.query(
        `(SELECT author.author_fullname AS author,0 AS professor FROM category,book_category,book,book_author,author
            WHERE category.category_id=? AND category.category_id=book_category.category_id AND book_category.school_id=book.school_id
            AND book_category.isbn=book.isbn AND book_author.isbn=book.isbn AND book_author.school_id=book.school_id AND book_author.author_id=author.author_id)
         UNION
         (SELECT 0 AS author,users.user_fullname AS professor FROM category,book_category,book,rental,users,professor
            WHERE category.category_id=? AND category.category_id=book_category.category_id AND book_category.school_id=book.school_id AND book_category.isbn=book.isbn
            AND rental.isbn=book.isbn AND rental.school_id=book.school_id AND rental.user_id=users.user_id AND users.user_id=professor.user_id
            AND TIMESTAMPDIFF(YEAR,rental.rental_datetime,NOW()) < 1 )`,
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
