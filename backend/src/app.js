const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../../frontend/build'));

// configure db connection
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // Max number of open connections
    idleTimeoutMillis: 30000, // Max time of connection inactivity (in ms)
    connectionTimeoutMillis: 2000, // Max time to open a new connection (w ms)
})

db.on('error', (err) => {
    console.error('Connection pool error:', err);
});

// API routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes(db, JWT_SECRET));

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter(db, JWT_SECRET));

// serve static React build
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

// start server
app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
});
