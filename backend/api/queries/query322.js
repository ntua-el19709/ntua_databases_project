const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:name/:surname/:delay_days/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.2.2 executed succesfully!",
    async (conn) => {
      let name = "%";
      if (req.params.name !== "none") name = req.params.name + name;
      if (req.params.surname !== "none")
        name = name + " " + req.params.surname + "%";
      let ddays = 0;
      if (req.params.delay_days !== "none")
        ddays = Number(req.params.delay_days);
      ddays += 7;

      const ans_list = await conn.query(
        `SELECT COUNT(rental.rental_id) AS num_books,users.user_fullname, DATEDIFF(CURDATE(),MAX(rental.rental_datetime))-7 AS days_delayed
          FROM rental
          JOIN users ON rental.user_id = users.user_id
          WHERE rental.school_id = ? AND users.user_fullname LIKE ? AND rental.returned = false AND users.user_id = rental.user_id AND TIMESTAMPDIFF(DAY, rental.rental_datetime, NOW()) > ?
          GROUP BY users.user_id
          ORDER BY users.user_fullname`,
        [req.params.schlid, name, ddays]
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
