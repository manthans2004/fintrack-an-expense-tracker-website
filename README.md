# FinTrack - Expense Tracker 💸

FinTrack is a web-based application designed to help users efficiently track and manage their personal expenses. With FinTrack, users can add, view, and analyze their financial transactions, gaining better insights into their spending habits.

## Features

- **User Management**: Securely add and manage user information.
- **Transaction Tracking**: Record details of income and expenses.
- **Data Storage**: Utilizes MySQL for robust data management.
- **Backend Services**: Node.js scripts for database interactions and API endpoints.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **Database**: MySQL

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MySQL](https://www.mysql.com/) installed and running

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/manthans2004/fintrack-an-expense-tracker-website.git
Navigate to the Project Directory:

bash
Copy
Edit
cd fintrack-an-expense-tracker-website
Install Backend Dependencies:

bash
Copy
Edit
npm install
Set Up the Database:

Create a MySQL database named fintrack.

Import the fintrack.sql file located in the root directory to set up the necessary tables.

Configure Database Connection:

Update the db.js file with your MySQL credentials:

javascript
Copy
Edit
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'fintrack',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
Run the Backend Server:

bash
Copy
Edit
node testConnection.js
If the connection is successful, you should see Connected to MySQL in the console.

Project Structure
addUser.js: Script to add a new user to the database.

getTransactions.js: Retrieves transactions from the database.

generatekey.js: Generates API keys for secure access.

db.js: Establishes and manages the database connection.

testConnection.js: Tests the database connection.

fintrack.sql: SQL script to set up the database schema.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.
