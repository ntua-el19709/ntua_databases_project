const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid/:isbn", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of book reviews!",
    async (conn) => {
      const results = await conn.query(
        `SELECT review.likert,review.description,book.title, users.username
        FROM review
        JOIN book ON review.school_id = book.school_id AND review.isbn = book.isbn
        JOIN users ON review.user_id = users.user_id
        WHERE review.school_id = ? AND review.isbn = ? AND review.approved = true`,
        [req.params.schlid, req.params.isbn]
      );
      let title = "No Reviews";
      if (results.length != 0) title = results[0].title;

      let json_q = {
        book: title,
        bookReviews: [],
      };

      for (elem of results) {
        json_q.bookReviews.push({
          username: elem.username,
          likert: elem.likert,
          description: elem.description,
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
