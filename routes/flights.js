const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM flights`)
    .then(data => {
      res.send(data.rows)
    })

  })
  return router;
};