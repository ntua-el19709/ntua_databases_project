const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:category", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Category added!",
    async (conn1) => {
      await conn1.query("INSERT INTO category (category_name) VALUES (?)", [
        req.params.category,
      ]);
    }
  );
});

module.exports = router;
