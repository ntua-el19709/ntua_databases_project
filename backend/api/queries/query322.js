const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:name/:surname/:delay_days", async (req, res) => {
    await apiutils.requestWrapper(
      true,
      req,
      res,
      "Query 3.2.2 executed succesfully!",
      async (conn) => {
        const ans_list = await conn.query(
          `SELECT u.user_fullname, COUNT(*) AS num_books, DATEDIFF(CURDATE(), MAX(r.rental_datetime)) AS days_delayed
          FROM users AS u
          JOIN rental AS r ON u.user_id = r.user_id
          WHERE r.returned = 0
          GROUP BY u.user_fullname
          HAVING COUNT(*) >= 1 AND DATEDIFF(CURDATE(), MAX(r.rental_datetime)) > 0
          ORDER BY u.user_fullname;`,
        );
  
        json_res = [];
        for (elem of ans_list) {
          json_res.push({
            user_fullname: elem.user_fullname,
            num_books: elem.num_books,
            days_delayed: elem.days_delayed,
          });
        }
        return json_res;
      }
    );
  });

module.exports = router;
