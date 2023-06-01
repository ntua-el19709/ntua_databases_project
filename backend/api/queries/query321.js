const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:title/:category/:author/:copies", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.2.1 executed succesfully!",
    async (conn) => {
      let title = "%";
      if (req.params.title !== "none") title = req.params.title + title;
      let category = "%";
      if (req.params.category !== "none")
        category = req.params.category + category;
      let author = "%";
      if (req.params.author !== "none") author = req.params.author + author;
      let copies = "%";
      if (req.params.copies !== "none") copies = req.params.copies + copies;
      const ans_list = await conn.query(
        `SELECT b.title, a.author_fullname
            FROM book AS b
            JOIN book_author AS ba ON b.isbn = ba.isbn AND b.school_id = ba.school_id
            JOIN author AS a ON ba.author_id = a.author_id
            JOIN book_category AS bc ON b.isbn = bc.isbn AND b.school_id = bc.school_id
            JOIN category AS c ON bc.category_id = c.category_id
            WHERE 
            (b.title LIKE ?)
            AND (c.category_name LIKE ?)
            AND (a.author_fullname LIKE ?)
            AND (b.copies LIKE ?)
            ORDER BY b.title`,
        [title, category, author, copies]
      );
      json_res = [];
      book = { title: "", author_fullname: [] };
      for (elem of ans_list) {
        if (book.title === "") {
          book.title = elem.title;
        } else if (book.title !== elem.title) {
          json_res.push(structuredClone(book));
          book.title = elem.title;
          book.author_fullname = [];
        }
        if (book.author_fullname.indexOf(elem.author_fullname) === -1)
          book.author_fullname.push(elem.author_fullname);
      }
      json_res.push(book);
      return json_res;
    }
  );
});

module.exports = router;
