const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const { sessionMiddleware } = require('./config/session');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(sessionMiddleware);

// Routes
const gameRoutes = require('./routes/game');
app.use('/api/game', gameRoutes);

// Default test route
app.get('/api/your-route', (req, res) => {
    res.send('✅ Backend route is working!');
});

// MongoDB connection
require('./config/database')(mongoose);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
