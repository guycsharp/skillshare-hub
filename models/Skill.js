const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  description: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);