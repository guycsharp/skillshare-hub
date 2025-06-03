require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const skillRoutes = require('./routes/skills');

const app = express();
app.use(express.json()); // Middleware to parse JSON

connectDB(); // Connect MongoDB

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/skills', skillRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
