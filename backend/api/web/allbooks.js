const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of all books!",
    async (conn) => {
      const ans_list = await conn.query(
        "SELECT * FROM book Where book.school_id=?",
        [req.params.schlid]
      );

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          isbn: elem.isbn,
          schoolID: elem.school_id,
          title: elem.title,
        });
      }

      if (req.query.format == "csv") {
        const opts = {
          fields: ["isbn", "schoolID", "title"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }
  );
});
module.exports = router;
