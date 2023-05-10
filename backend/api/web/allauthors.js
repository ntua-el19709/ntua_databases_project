const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of all authors!",
    async (conn) => {
      const ans_list = await conn.query("SELECT * FROM author");

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          authorID: elem.author_id,
          author_fullname: elem.author_fullname,
        });
      }

      if (req.query.format == "csv") {
        const opts = {
          fields: ["authorID", "author_fullname"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }
  );
});

module.exports = router;
