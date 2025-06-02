const express = require('express');
const { getBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { restrictTo } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.route('/')
  .get(restrictTo('learner'), getBookings)
  .post(restrictTo('learner'), createBooking);

router.route('/:id')
  .put(restrictTo('learner'), updateBooking)
  .delete(restrictTo('learner'), deleteBooking);

module.exports = router;