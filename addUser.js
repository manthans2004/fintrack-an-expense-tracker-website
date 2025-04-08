const connection = require('./db');

const insertUser = (username, email, passwordHash) => {
    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    connection.query(query, [username, email, passwordHash], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return;
        }
        console.log('User added with ID:', results.insertId);
    });
};

// Call the function with sample data
insertUser('prajwal', 'pm@example.com', 'hashed_password123');
