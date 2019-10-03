const router = require("express").Router();

module.exports = db => {
  router.get("/", (req,res) => {
    db.query(`SELECT * FROM users;`).then(({rows: users}) => {
      res.json(
        users
      )
    })
  });
  router.post("/register", (req, res) => {
    const { username, city, password, email } = req.body;
    db.query(`INSERT INTO users (username, city, password, email)
    VALUES ($1, $2, $3, $4)`, [username, city, password, email])
    .then(() => "hello");
  });

  router.post("/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    
    db.query(`SELECT * FROM users 
    WHERE username = $1`, [username])
  })
  return router;
};
