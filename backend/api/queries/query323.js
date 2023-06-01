const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:user/:category", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.2.3 executed succesfully!",
    async (conn) => {
      let user = "%";
      if (req.params.user !== "none") user = req.params.user + user;
      let category = "%";
      if (req.params.category !== "none")
        category = req.params.category + category;

      const ans_list = await conn.query(
        `SELECT users.username, category.category_name AS category, AVG(review.likert) AS avguser_rating
            FROM users
            JOIN review ON users.user_id = review.user_id
            JOIN book_category ON review.isbn = book_category.isbn AND review.school_id = book_category.school_id
            JOIN category ON book_category.category_id=category.category_id
            WHERE users.username LIKE ? AND category.category_name LIKE ?
            GROUP BY users.username, category.category_name`,
        [user, category]
      );

      const json_res = [];

      for (elem of ans_list) {
        json_res.push({
          username: elem.username,
          category: elem.category,
          avguser_rating: elem.avguser_rating,
        });
      }

      return json_res;
    }
  );
});
module.exports = router;
