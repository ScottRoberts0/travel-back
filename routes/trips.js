const router = require("express").Router();

module.exports = db => {
  router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    db.query(`SELECT * FROM trips WHERE user_id = $1`, [userId])
    .then(data => {
      if (!data.rows[0]) {
        res.send("Not Found");
      } else {
        res.send(data.rows);
      }
     })
    .catch(error => res.send("Not Found"));
  });

  return router;
};

