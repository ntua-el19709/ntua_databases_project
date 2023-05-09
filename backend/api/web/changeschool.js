const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.get(
  "/:schlid/:name/:address/:city/:telephone/:email/:principal",
  async (req, res) => {
    await apiutils.requestWrapper(
      true,
      req,
      res,
      "School info Changed!",
      async (conn) => {
        await conn.query(
          "UPDATE school SET school_name=?,address=?,city=?,telephone=?,email=?,principal_fullname=? WHERE school.school_id=?",
          [
            req.params.name,
            req.params.address,
            req.params.city,
            req.params.telephone,
            req.params.email,
            req.params.principal,
            req.params.schlid,
          ]
        );
      }
    );
  }
);

module.exports = router;
