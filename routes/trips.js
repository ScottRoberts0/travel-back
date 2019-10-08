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

  router.post("/trip", (req, res) => {
    const { cityInformation, flightInformation } = req.body;
    const userId = ""
    console.log("cityInformation", cityInformation);
    console.log("flightInformation", flightInformation);
    let testKeys = Object.keys(flightInformation);
    let firstFlight = flightInformation[testKeys[0]];
    let bookingUrl = firstFlight.bookingUrl;
    let bookingUrlKeys = Object.keys(bookingUrl);
    let firstBookingUrl = bookingUrl[bookingUrlKeys[0]];
    console.log("firstBookingUrl", firstBookingUrl);
    
  });
  return router;
};

