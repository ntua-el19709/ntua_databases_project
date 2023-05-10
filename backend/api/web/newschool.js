const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post(
  "/:name/:address/:city/:telephone/:email/:principal",
  async (req, res) => {
    await apiutils.requestWrapper(
      false,
      req,
      res,
      "School Added!",
      async (conn) => {
        await conn.query(
          "INSERT INTO school (school_name, address, city, telephone, email, principal_fullname) VALUES (?, ?, ?, ?, ?, ?)",
          [
            req.params.name,
            req.params.address,
            req.params.city,
            req.params.telephone,
            req.params.email,
            req.params.principal,
          ]
        );
      }
    );
  }
);

module.exports = router;
