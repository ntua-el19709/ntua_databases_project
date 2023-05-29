const express = require("express");
const apiutils = require("../../apiutils");
const Parser = require("@json2csv/plainjs").Parser;
const router = express.Router();

router.get("/:year/:month", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Query 3.1.1 executed succesfully!",
    async (conn) => {
      let year = "%";
      if (req.params.year !== "none") year = req.params.year + year;
      let month = "%";
      if (req.params.month !== "none") month = req.params.month + month;
      if (month[0] == "0") month = month[1];

      const ans_list = await conn.query(
        `(SELECT school_name,COUNT(rental_id) AS num_of_rents FROM school,rental 
            WHERE school.school_id = rental.school_id AND CAST(YEAR(rental.rental_datetime) AS CHAR(4)) LIKE ? AND CAST(MONTH(rental.rental_datetime) AS CHAR(4)) LIKE ?
            GROUP BY school.school_id)
        UNION
        (SELECT school_name,0 AS num_of_rents from school
            WHERE school_id NOT IN (SELECT (school_id) from rental
                                        WHERE school.school_id = rental.school_id AND CAST(YEAR(rental.rental_datetime) AS CHAR(4)) LIKE ? AND CAST(MONTH(rental.rental_datetime) AS CHAR(4)) LIKE ?))`,
        [year, month, year, month]
      );

      json_res = [];
      for (elem of ans_list) {
        json_res.push({
          school_name: elem.school_name,
          num_of_rents: elem.num_of_rents,
        });
      }

      if (req.query.format == "csv") {
        const opts = {
          fields: ["schoolID", "schoolname"],
        };
        return new Parser(opts).parse(json_res);
      } else {
        return json_res;
      }
    }
  );
});

module.exports = router;
