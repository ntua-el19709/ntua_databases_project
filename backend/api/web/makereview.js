const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:userID/:isbn/:schlID/:likert/:description", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Review Made!",
    async (conn) => {
      await conn.query(
        "INSERT INTO review (user_id, isbn, school_id, likert, description, approved) VALUES (?, ?, ?, ?, ?,false)",
        [
          req.params.userID,
          req.params.isbn,
          req.params.schlID,
          req.params.likert,
          req.params.description,
        ]
      );
    }
  );
});

module.exports = router;
