CREATE DATABASE FinTrack;
use FinTrack;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique ID for each transaction.
    user_id INT NOT NULL,                     -- Links the transaction to a specific user.
    amount DECIMAL(10, 2) NOT NULL,           -- The transaction amount (e.g., 50.25).
    category VARCHAR(50) NOT NULL,            -- The category (e.g., Food, Transport).
    transaction_date DATE NOT NULL,           -- The date of the transaction.
    description TEXT,                         -- Optional description of the transaction.
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Links to the `users` table.
);
select*from users;
drop table transactions;
drop table users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique ID for each transaction.
    user_id INT NOT NULL,                     -- Links the transaction to a specific user.
    amount DECIMAL(10, 2) NOT NULL,           -- The transaction amount (e.g., 50.25).
    category VARCHAR(50) NOT NULL,            -- The category (e.g., Food, Transport).
    transaction_date DATE NOT NULL,           -- The date of the transaction.
    description TEXT,                         -- Optional description of the transaction.
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Links to the `users` table.
);
ALTER TABLE users ADD COLUMN iv VARCHAR(32);
select*from users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    iv VARCHAR(32) NOT NULL  -- Store the IV as a hex string
);


