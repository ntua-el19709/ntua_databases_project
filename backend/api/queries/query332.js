const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:userID", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.3.2 executed succesfully!",
    async (conn) => {
      const ans_list = await conn.query(
        `SELECT DISTINCT book.title
            FROM book
            JOIN rental ON book.isbn = rental.isbn AND book.school_id = rental.school_id
            JOIN users ON rental.user_id = users.user_id
            WHERE users.user_id LIKE ?`,
        [req.params.userID]
      );

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          title: elem.title,
        });
      }
      return json_res;
    }
  );
});

module.exports = router;
