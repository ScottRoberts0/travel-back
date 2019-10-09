const router = require("express").Router();

module.exports = db => {
  router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    db.query(`SELECT * FROM trips WHERE user_id = $1 ORDER BY id DESC`, [userId])
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

    const { cityInformation, flightInformation, userId, passengers, name, url } = req.body;

    let testKeys = Object.keys(flightInformation);
    let firstFlight = flightInformation[testKeys[0]];
    let bookingUrl = firstFlight.booking_urls;
    let bookingUrlKeys = Object.keys(bookingUrl);
    let firstBookingUrl = bookingUrl[bookingUrlKeys[0]];
    console.log("firstBookingUrl", firstBookingUrl);
    
    const newTripString = `INSERT INTO trips(user_id, passengers, name) VALUES ($1, $2, $3) RETURNING id`
    const newTripParams = [userId, passengers, name];

    db.query(newTripString, newTripParams)
      .then((data) => {
        const trip_id = data.rows[0].id;
        console.log(trip_id);
        for (let i = 0; i < cityInformation.length; i++) {
          let city = cityInformation[i];
          let newCityString = `INSERT INTO cities(trip_id, order_number, name, code, lat, lng, departure_date, img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
          let newCityParams = [trip_id, i+1, city.name, city.cityCode, city.lat, city.lng, city.departureDate, city.photo];
          db.query(newCityString, newCityParams)
          .then((cityData) => {
            console.log(cityData.rows);
          })
        }

        let keys = Object.keys(flightInformation);
        for (let i = 0; i < keys.length; i++) {
          let flight = flightInformation[keys[i]];
          let bookingUrl = flight.booking_urls;
          let bookingUrlKeys = Object.keys(bookingUrl);
          let firstBookingUrl = bookingUrl[bookingUrlKeys[0]];
          let newFlightString = `INSERT INTO flights(trip_id, airline, price, departure_location, arrival_location, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
          let newFlightParams = [trip_id, firstBookingUrl.name , flight.unrounded_price, cityInformation[i].cityCode, cityInformation[i+1].cityCode, url[i]];
          db.query(newFlightString, newFlightParams)
          .then((flightData) => {
            console.log(flightData);
          });
        }
      })
  });
  return router;
};

