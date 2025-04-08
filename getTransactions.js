const connection = require('./db');

const getTransactions = (userId) => {
    const query = 'SELECT * FROM transactions WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching transactions:', err);
            return;
        }
        console.log('Transactions:', results);
    });
};

// Call the function with a user ID
getTransactions(1);
