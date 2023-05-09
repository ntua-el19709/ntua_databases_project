const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.get("/:username/:password/:fullname/:dob", async (req, res) => {
  await apiutils.requestWrapper(
    true,
    req,
    res,
    "User info changed!",
    async (conn1, conn2) => {
      await conn1.query(
        "UPDATE users SET passwrd=?,user_fullname=?,date_of_birth= DATE ? where users.username = ?",
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
