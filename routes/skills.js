const express = require('express');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { restrictTo } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(restrictTo('mentor'), createSkill);

router.route('/:id')
  .put(restrictTo('mentor'), updateSkill)
  .delete(restrictTo('mentor'), deleteSkill);

module.exports = router;