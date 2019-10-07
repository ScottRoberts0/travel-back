const router = require("express").Router();

module.exports = db => {
  router.get("/:tripId", (req, res) => {
    const tripId = req.params.tripId;
    db.query(`SELECT * FROM trips WHERE id = $1`, [tripId])
    .then(data => {
      if (!data.rows[0]) {
        res.send("Not Found");
      } else {
        const trip = data.rows[0];

        db.query(`SELECT * FROM cities WHERE trip_id = $1`, [tripId]).then(
          data => {
            trip.cities = data.rows;

            db.query(`SELECT * FROM flights WHERE trip_id = $1`, [tripId]).then(
              data => {
                trip.flights = data.rows;
                res.json(trip);
              }
            );
          }
        );
      }
    })
    .catch(error => res.send("Not Found"));
  });

  return router;
};