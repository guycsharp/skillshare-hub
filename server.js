const express = require('express');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const skillRoutes = require('./routes/skills');

const app = express();

app.use(express.json()); // Middleware to parse JSON
connectDB(); // Connect to MongoDB

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/skills', skillRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
