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
        `SELECT review.likert
        FROM review
        JOIN book ON review.school_id = book.school_id AND review.isbn = book.isbn
        WHERE review.school_id = ? AND review.isbn = ? AND review.approved = true;`,
        [req.params.schlid, req.params.isbn]
      );
      let title = "No Reviews";
      let sum = 0.0;

      for (elem of results) {
        sum += elem.likert;
      }

      if (results.length != 0) {
        title = results[0].title;
        sum = sum / results.length;
      }

      let json_q = {
        book: title,
        likert: sum.toFixed(1),
      };

      if (req.query.format == "csv") {
        return new Parser().parse(json_q);
      } else {
        return json_q;
      }
    }
  );
});

module.exports = router;
