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
          let userQuery = '';
          let categoryQuery = '';

          if (req.params.user !== 'none') {
              userQuery = `
                  SELECT users.username, AVG(review.likert) AS avguser_rating
                  FROM users
                  JOIN review ON users.user_id = review.user_id
                  WHERE users.username LIKE ?
                  GROUP BY users.username;
              `;
          }

          if (req.params.category !== 'none') {
              categoryQuery = `
                  SELECT category.category_name, AVG(review.likert) AS avgcategory_rating
                  FROM category
                  JOIN book_category ON category.category_id = book_category.category_id
                  JOIN review ON book_category.isbn = review.isbn AND book_category.school_id = review.school_id
                  WHERE category.category_name LIKE ?
                  GROUP BY category.category_name;
              `;
          }

          const userResult = userQuery !== '' ? await conn.query(userQuery, [req.params.user]) : [];
          const categoryResult = categoryQuery !== '' ? await conn.query(categoryQuery, [req.params.category]) : [];

          const json_res = [];

          if (userResult.length > 0) {
              for (const user of userResult) {
                  json_res.push({
                      username: user.username,
                      avguser_rating: user.avguser_rating,
                  });
              }
          }

          if (categoryResult.length > 0) {
              for (const category of categoryResult) {
                  json_res.push({
                      category_name: category.category_name,
                      avgcategory_rating: category.avgcategory_rating,
                  });
              }
          }

          return json_res;
      }
  );
});
module.exports = router;
