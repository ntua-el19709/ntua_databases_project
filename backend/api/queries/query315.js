const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.1.5 executed succesfully!",
    async (conn) => {
      let min_no_of_rents = 20;
      let min_no_of_ops = 1;
      const ans_list = await conn.query(
        `SELECT operator, num_of_rents
        FROM (
            SELECT users.user_fullname AS operator, COUNT(rental.rental_id) AS num_of_rents
            FROM rental
            INNER JOIN operator ON rental.school_id = operator.school_id
            INNER JOIN users ON operator.user_id = users.user_id
            WHERE TIMESTAMPDIFF(YEAR, rental.rental_datetime, NOW()) < 1
            GROUP BY operator.user_id
            ORDER BY num_of_rents DESC
        ) AS Q2
        WHERE Q2.num_of_rents IN (
            SELECT num_of_rents
            FROM (
                SELECT rental.school_id AS school, COUNT(rental.rental_id) AS num_of_rents
                FROM rental
                WHERE TIMESTAMPDIFF(YEAR, rental.rental_datetime, NOW()) < 1
                GROUP BY school
                HAVING num_of_rents > ?
                ORDER BY num_of_rents DESC
            ) AS Q1
            GROUP BY Q1.num_of_rents
            HAVING COUNT(Q1.school) > ?
        )
        ORDER BY num_of_rents DESC`,
        [min_no_of_rents, min_no_of_ops]
      );

      json_res = [];
      for (elem of ans_list) {
        json_res.push(elem);
      }

      return json_res;
    }
  );
});

module.exports = router;
