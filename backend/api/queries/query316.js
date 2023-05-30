const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.1.6 executed succesfully!",
    async (conn) => {
      const ans_list = await conn.query(
        `SELECT c1.category_name as cat1, c2.category_name as cat2,COUNT(rental.rental_id) as num_of_rents
         FROM category AS c1,category AS c2,book_category AS b1,book_category AS b2,rental
         WHERE c1.category_id <c2.category_id AND c1.category_id=b1.category_id AND c2.category_id=b2.category_id
         AND b1.isbn=b2.isbn AND b1.school_id=b2.school_id AND rental.school_id=b1.school_id AND rental.isbn=b1.isbn
         GROUP BY cat1,cat2 ORDER BY num_of_rents DESC
         LIMIT 3`
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
