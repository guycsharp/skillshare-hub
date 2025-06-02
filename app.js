const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/connectDB');
const authRoutes = require('./routes/auth');
const skillRoutes = require('./routes/skills');
const bookingRoutes = require('./routes/bookings');
const { protect } = require('./middlewares/authMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/skills', protect, skillRoutes);
app.use('/api/bookings', protect, bookingRoutes);

app.get('/', (req, res) => res.send('SkillShare Hub API'));

module.exports = app;