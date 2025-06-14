const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3040;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quizsprint"
});

db.connect((err) => {
    if (err) throw err;
    console.log('✅ Connected to MySQL');
});

// POST route to insert data
app.post('/signup', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    
    const query = 'INSERT INTO users (name,password) VALUES (?,?)';
    db.query(query, [name,password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('❌ Database error');
        }
        res.send('✅ Name inserted successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
