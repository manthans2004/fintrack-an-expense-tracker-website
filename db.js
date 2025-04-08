const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool using the credentials from environment variables
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Establish a connection to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Export the connection object so it can be used elsewhere in the project
module.exports = connection;
