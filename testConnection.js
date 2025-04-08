const connection = require('./db');

// Simple query to test connection
connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Query error:', err);
        return;
    }
    console.log('Database test query result:', results[0].solution); // Should log: 2
});
