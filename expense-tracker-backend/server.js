require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mysql = require("mysql2");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// MySQL Database Connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "12345",
  database: "FinTrack",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database!");
});

// Encryption Configuration
const algorithm = "aes-256-cbc";
const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  console.error("SECRET_KEY is not defined in the .env file.");
  process.exit(1);
}

const secretKeyBuffer = Buffer.from(secretKey, "hex");

// Password Encryption Function
function encryptPassword(password) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKeyBuffer, iv);
  let encrypted = cipher.update(password, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return { encrypted, iv: iv.toString("hex") };
}

// Password Decryption Function
function decryptPassword(encryptedPassword, iv) {
  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(algorithm, secretKeyBuffer, ivBuffer);
  let decrypted = decipher.update(encryptedPassword, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

// Generate JWT Token
function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
}

// Middleware: Authenticate Token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ success: false, message: "Access denied, no token provided." });

  const actualToken = token.split(" ")[1];
  jwt.verify(actualToken, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token." });
    req.user = user;
    next();
  });
}

// Email Sending Route
app.post("/send-email", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: "Message is required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL, // Sender's email address
    to: "manthanshashi1995@gmail.com", // Recipient email address
    subject: "Help Request",
    text: `Message:\n${message}`, // Message content
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(500).json({ success: false, message: "Failed to send email." });
    }

    console.log("Email sent:", info.response);
    res.json({ success: true, message: "Email sent successfully." });
  });
});

// API Routes
// 1. Signup Route
app.post("/api/signup", (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "Full name, email, and password are required." });
  }

  const { encrypted, iv } = encryptPassword(password);
  const sql = "INSERT INTO users (fullName, email, password, iv) VALUES (?, ?, ?, ?)";
  db.query(sql, [fullName, email, encrypted, iv], (err) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ success: false, message: "Error inserting data into database." });
    }
    res.json({ success: true, message: "User registered successfully!" });
  });
});

// 2. Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const user = results[0];
    try {
      const decryptedPassword = decryptPassword(user.password, user.iv);
      if (password !== decryptedPassword) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      const token = generateToken(user);
      res.json({ success: true, message: "Login successful.", userId: user.id, token });
    } catch (e) {
      console.error("Error during decryption:", e);
      res.status(500).json({ success: false, message: "Decryption error." });
    }
  });
});

// 3. Add Transaction Route
app.post("/api/transactions", authenticateToken, (req, res) => {
  const { category, amount, date, description } = req.body;
  const userId = req.user.id;

  const sql = "INSERT INTO transactions (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [userId, category, amount, date, description], (err) => {
    if (err) {
      console.error("Error inserting transaction:", err);
      return res.status(500).json({ success: false, message: "Error inserting transaction into database." });
    }
    res.json({ success: true, message: "Transaction added successfully!" });
  });
});

// 4. Get Transactions Route
app.get("/api/transactions", authenticateToken, (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ success: false, message: "Error fetching transactions." });
    }
    res.json({ success: true, transactions: results });
  });
});

// Root Route - Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
