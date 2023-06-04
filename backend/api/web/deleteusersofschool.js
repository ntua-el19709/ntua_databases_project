const express = require("express");
const apiutils = require("../../apiutils");
const router = express.Router();

router.post("/:schlid", async (req, res) => {
  await apiutils.requestWrapper(
    false,
    req,
    res,
    "Users of school deleted!",
    async (conn1) => {
      await conn1.query(
        `DELETE from users
          WHERE users.user_id IN
            (SELECT user_id FROM student WHERE school_id=?
            UNION
            SELECT user_id FROM professor WHERE school_id=?
            UNION
            SELECT user_id FROM operator WHERE school_id=?)`,
        [req.params.schlid, req.params.schlid, req.params.schlid]
      );
    }
  );
});

module.exports = router;
