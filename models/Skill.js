const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  description: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
