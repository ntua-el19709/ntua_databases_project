const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.get("/:username/:password/:fullname/:dob", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "Successful application!",
    async (conn1, conn2) => {
      await conn1.query(
        "INSERT INTO users (username, passwrd, user_fullname, date_of_birth, approved) VALUES (?, ?, ?, DATE ?, ?)",
        [
          req.params.username,
          req.params.password,
          req.params.fullname,
          req.params.dob,
          0,
        ]
      );
    }
  );
});

module.exports = router;
