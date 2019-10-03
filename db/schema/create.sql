DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS tripcities CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS flights CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,6) NOT NULL,
  longditude DECIMAL(10,6) NOT NULL
);

CREATE TABLE tripcities (
  id SERIAL PRIMARY KEY NOT NULL,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
  order_number SMALLINT NOT NULL,
  departure_date DATE NOT NULL
);

CREATE TABLE flights (
  id SERIAL PRIMARY KEY NOT NULL,
  airline VARCHAR(255) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  departure_location VARCHAR(255) NOT NULL,
  arrival_location VARCHAR(255) NOT NULL,
  duration VARCHAR NOT NULL
);

