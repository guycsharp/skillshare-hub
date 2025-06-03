const express = require('express');
const { getBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, restrictTo('learner'), getBookings)
  .post(protect, restrictTo('learner'), createBooking);

router.route('/:id')
  .put(protect, restrictTo('admin', 'mentor'), updateBooking) // ✅ Now allows both roles
  .delete(protect, restrictTo('learner'), deleteBooking);

module.exports = router;
