const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful retrieval of all categories!",
    async (conn) => {
      const ans_list = await conn.query("SELECT * FROM category");

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          categoryID: elem.category_id,
          category: elem.category_name,
        });
      }

      if (req.query.format == "csv") {
        const opts = {
          fields: ["categoryID", "category"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }
  );
});

module.exports = router;
