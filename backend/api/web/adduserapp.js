const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:username/:password/:fullname/:dob", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Successful application!",
    async (conn1) => {
      await conn1.query(
        "INSERT INTO users (username, passwrd, user_fullname, date_of_birth, approved) VALUES (?, ?, ?, date_add(DATE ?,interval 1 day), ?)",
        [
          req.params.username,
          req.params.password,
          req.params.fullname,
          req.params.dob,
          false,
        ]
      );
    }
  );
});

module.exports = router;
