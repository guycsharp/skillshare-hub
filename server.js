require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const skillRoutes = require('./routes/skills');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/skills', skillRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
