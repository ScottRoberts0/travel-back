require('dotenv').config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const PORT = 8080;

const users = require("./routes/users");
const trips = require("./routes/trips");
const cities = require("./routes/cities");
const tripCities = require("./routes/tripcities");
const flights = require("./routes/flights");

const read = function(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Express Configuration
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use("/users", users(db));
app.use("/cities", cities(db));
app.use("/trips", trips(db));
app.use("/tripcities", tripCities(db));
app.use("/flights", flights(db));

if (process.env.DB_HOST) {
  Promise.all([
    read(`./db/schema/create.sql`),
    read(`./db/schema/development.sql`)
  ])
    .then(([create, seed]) => {
      app.get("/database/reset", (request, response) => {
        db.query(create)
          .then(() => db.query(seed))
          .then(() => {
            console.log("Database Reset");
            response.status(200).send("Database Reset");
          });
      });
    })
    .catch(error => {
      console.log(`Error setting up the reset route: ${error}`);
    });
}

app.get('/', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
