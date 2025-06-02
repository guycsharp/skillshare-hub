const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
  const skills = await Skill.find().populate('mentor', 'name');
  res.json(skills);
};

exports.createSkill = async (req, res) => {
  const skill = await Skill.create({ ...req.body, mentor: req.user._id });
  res.status(201).json(skill);
};

exports.updateSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (skill.mentor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  Object.assign(skill, req.body);
  await skill.save();
  res.json(skill);
};

exports.deleteSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (skill.mentor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  await skill.remove();
  res.json({ message: 'Skill deleted' });
};