const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:username/:password/:fullname/:dob", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "User info changed!",
    async (conn1, conn2) => {
      await conn1.query(
        "UPDATE users SET passwrd=?,user_fullname=?,date_of_birth= date_add(DATE ?,interval 1 day) where users.username = ?",
        [
          req.params.password,
          req.params.fullname,
          req.params.dob,
          req.params.username,
        ]
      );
    }
  );
});

module.exports = router;
