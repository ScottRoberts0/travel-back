const router = require("express").Router();
const bcrypt  = require("bcrypt");

module.exports = db => {
  router.get("/", (req,res) => {
    db.query(`
    SELECT * 
    FROM users`)
    .then(data => {res.json({
      data: data.rows
    })});
    // .then(user => {
    //   if (user.length) {
    //     res.redirect('/');
    //   } else {
    //     const templateVars = {
    //       data: user,
    //       error: false
    //   }
    //   res.render('register', templateVars);
    //   }
    // });
  });
  router.post("/register", (req, res) => {
    const { username, city, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const usernameCheckQueryParams = [username];
    const usernameCheckQueryString = `
    SELECT *
    FROM users
    WHERE username = $1;
    `;

    db.query(usernameCheckQueryString, usernameCheckQueryParams)
    .then(data => data.rows)
    .then(user => {
      if (!user.length) {
        const regQueryString = `INSERT INTO users (username, city, password, email)
        VALUES ($1, $2, $3, $4) RETURNING username, id`;
        const regQueryParams = [username, city, hashedPassword, email]
      db.query(regQueryString, regQueryParams)
      .then(res => res.rows)
      .then(user => {
          res.send(
            JSON.stringify({
              user
            })
          )
      })
      } else {
        res.send("Email already exists");
      }});
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const queryParams = [email]
    const queryString = `
    SELECT *
    FROM users 
    WHERE email = $1`;

    db.query(queryString, queryParams)
    .then(res => res.rows)
    .then(user => {
      if (user.length) {
        if (bcrypt.compareSync(password, user[0]['password'])){
          res.send(
            JSON.stringify({
              user
            })
          )
        } else {
          console.log("hello1");
          res.send("incorrect password");
          console.log("hello");
        }
      } else {
        res.send("invalid email");
      }
    });
  });
  return router;
};
