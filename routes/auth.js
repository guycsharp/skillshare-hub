const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController'); 
const { protect } = require('../middlewares/authMiddleware');

console.log('Auth Controller Imports:', { register, login, getUserProfile }); // Debugging log
console.log('Protect Middleware:', protect); // Debugging log

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getUserProfile);

module.exports = router;
