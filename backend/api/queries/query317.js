const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
    await apiutils.requestWrapper(
      true,
      req,
      res,
      "Query 3.1.7 executed succesfully!",
      async (conn) => {
        const ans_list = await conn.query(
          `SELECT a.author_fullname
          FROM author a
          JOIN book_author ba ON a.author_id = ba.author_id
          GROUP BY a.author_id, a.author_fullname
          HAVING COUNT(*) < (
              SELECT COUNT(*)
              FROM book_author
              GROUP BY author_id
              ORDER BY COUNT(*) DESC
              LIMIT 1
          ) - 4;`
        );
  
        json_res = [];
        for (elem of ans_list) {
          json_res.push({
            author_fullname: elem.author_fullname,
          });
        }
  
        return json_res;
      }
    );
  });

module.exports = router;
