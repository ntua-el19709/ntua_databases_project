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
      let min_no_of_rents = 0;
      let min_no_of_ops = 1;
      const ans_list = await conn.query(
        `SELECT operator, num_of_rents
            FROM (SELECT users.user_fullname AS operator, COUNT(rental.rental_id) AS num_of_rents FROM rental,users,operator
                WHERE rental.school_id=operator.school_id AND users.user_id=operator.user_id AND TIMESTAMPDIFF(YEAR,rental.rental_datetime,NOW()) < 1
                GROUP BY operator.user_id ORDER BY num_of_rents DESC) AS Q4
            WHERE Q4.num_of_rents IN
                (SELECT num_of_rents FROM
                    (SELECT num_of_rents, COUNT(Q2.user_id) as num_of_ops FROM users,
                        (SELECT operator, num_of_rents,user_id
                        FROM (SELECT users.user_fullname AS operator, COUNT(rental.rental_id) AS num_of_rents, operator.user_id AS user_id FROM rental,users,operator
                            WHERE rental.school_id=operator.school_id AND users.user_id=operator.user_id AND TIMESTAMPDIFF(YEAR,rental.rental_datetime,NOW()) < 1
                            GROUP BY operator.user_id ORDER BY num_of_rents DESC) AS Q1
                        WHERE Q1.num_of_rents > ?) AS Q2
                    WHERE users.user_id=Q2.user_id
                    GROUP BY Q2.num_of_rents) as Q3
                WHERE Q3.num_of_ops>?)
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
