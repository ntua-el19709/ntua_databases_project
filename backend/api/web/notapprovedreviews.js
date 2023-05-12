const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of unapproved reviews!",
    async (conn) => {
      const results = await conn.query(
        `(SELECT * FROM review,book,users
            WHERE review.school_id = ? AND review.school_id=book.school_id AND review.isbn=book.isbn AND review.user_id = users.user_id AND review.approved = false)`,
        [req.params.schlid]
      );

      let json_q = {
        unapprovedReviews: [],
      };

      for (elem of results) {
        json_q.unapprovedReviews.push({
          reviewID: elem.review_id,
          username: elem.username,
          book: elem.title,
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
