-- Creation of the project schema
CREATE SCHEMA IF NOT EXISTS e_learning;

-- User information table
CREATE TABLE IF NOT EXISTS e_learning.users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- User's simulation settings table
CREATE TABLE IF NOT EXISTS e_learning.user_settings (
    settings_id SERIAL PRIMARY KEY,
    num_rows INT DEFAULT 40,
    num_cols INT DEFAULT 60,
    delay INT DEFAULT 100,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES e_learning.users(user_id) ON DELETE CASCADE
);
