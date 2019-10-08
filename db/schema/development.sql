INSERT INTO users (email, username, password, city) VALUES ('my_email@gmail.com', 'myemail', 'password', 'Calgary');
INSERT INTO users (email, username, password, city) VALUES ('your_email@email.com', 'youremail', 'password', 'Edmonton');

INSERT INTO trips (user_id, passengers, name, password) VALUES (1, 5, 'Europe Trip', 'password');
INSERT INTO cities (trip_id, order_number, name, code, lat, lng, departure_date) VALUES (1, 1, 'Calgary', 'YEG', 51.048615, -114.070847, '2001-10-05');
INSERT INTO flights (trip_id, airline, price, departure_location, arrival_location, routing_iden) VALUES (1, 'WestJet', 399.99, 'Calgary', 'Edmonton', 'asdfjaslfhads21jadf1234')