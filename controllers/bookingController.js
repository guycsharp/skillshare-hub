const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ learner: req.user._id }).populate('skill');
  res.json(bookings);
};

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, learner: req.user._id });
  res.status(201).json(booking);
};

exports.updateBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking.learner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  Object.assign(booking, req.body);
  await booking.save();
  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking.learner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  await booking.remove();
  res.json({ message: 'Booking deleted' });
};