// backend/routes/game.js

const express = require('express');
const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Game route is working!' });
});

module.exports = router;
