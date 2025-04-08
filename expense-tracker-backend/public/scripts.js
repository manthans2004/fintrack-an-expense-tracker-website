// Handle sign-up
function signUp() {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Signup successful! You can now log in.');
            window.location.href = 'login.html'; // Redirect to login page after sign-up
        } else {
            alert(data.message || 'Signup failed');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('An error occurred during sign-up.');
    });
}

// Handle login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('authToken', data.token); // Save token in localStorage
            window.location.href = 'dashboard.html'; // Redirect to dashboard after successful login
        } else {
            alert(data.message || 'Login failed');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('An error occurred during login.');
    });
}

// Logout function
function logout() {
    localStorage.removeItem('authToken'); // Remove the token on logout
    window.location.href = 'login.html'; // Redirect to login page
}

// Navigate to other pages (Optional)
function navigateTo(page) {
    window.location.href = page;
}
