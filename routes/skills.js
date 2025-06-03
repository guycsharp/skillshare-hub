const express = require('express');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middlewares/authMiddleware');  // Import protect middleware
const { restrictTo } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, restrictTo('mentor'), createSkill);

router.route('/:id')
  .put(protect, restrictTo('mentor'), updateSkill)
  .delete(protect, restrictTo('mentor'), deleteSkill);

module.exports = router;
