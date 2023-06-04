const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post(
  "/:userID/:isbn/:schlID/:likert/:description/:type",
  async (req, res) => {
    await apiutils.requestWrapper(
      false,
      req,
      res,
      "Review Made!",
      async (conn) => {
        let tof = false;
        if (req.params.type === "2")
          //professor
          tof = true;
        await conn.query(
          "INSERT INTO review (user_id, isbn, school_id, likert, description, approved) VALUES (?, ?, ?, ?, ?,?)",
          [
            req.params.userID,
            req.params.isbn,
            req.params.schlID,
            req.params.likert,
            req.params.description,
            tof,
          ]
        );
      }
    );
  }
);

module.exports = router;
