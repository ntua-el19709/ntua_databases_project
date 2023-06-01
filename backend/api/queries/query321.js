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
      if (req.params.category !== "none") category = req.params.category + category;
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
            (b.title LIKE ? OR ? IS NULL)
            AND (c.category_name LIKE ? OR ? IS NULL)
            AND (a.author_fullname LIKE ? OR ? IS NULL)
            AND (b.copies LIKE ? OR ? IS NULL)
            AND (? IS NOT NULL OR ? IS NOT NULL OR ? IS NOT NULL OR ? IS NOT NULL);`,
        [title, title, category, category, author, author, copies, copies, title, category, author, copies]
        );
  
        json_res = [];
        for (elem of ans_list) {
          json_res.push({
            title: elem.title,
            author_fullname: elem.author_fullname,
          });
        }
        return json_res;
      }
    );
  });

module.exports = router;
