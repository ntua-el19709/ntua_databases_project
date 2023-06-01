const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.1.3 executed succesfully!",
    async (conn) => {
      const ans_list = await conn.query(
        `SELECT users.user_fullname AS fullname, COUNT(rental.rental_id) AS num_of_books
        FROM rental
        INNER JOIN users ON rental.user_id = users.user_id
        INNER JOIN professor ON users.user_id = professor.user_id
        WHERE TIMESTAMPDIFF(YEAR, users.date_of_birth, NOW()) < 40
        GROUP BY users.user_id
        ORDER BY num_of_books DESC`
      );

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          professor: elem.fullname,
          num_of_books: elem.num_of_books,
        });
      }

      return json_res;
    }
  );
});

module.exports = router;
