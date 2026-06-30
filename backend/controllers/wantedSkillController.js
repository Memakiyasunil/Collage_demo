const WantedSkill = require('../models/WantedSkill');

// GET /api/wanted-skills  — current user's wanted skills
const getWantedSkills = async (req, res) => {
  try {
    const skills = await WantedSkill.find({ userId: req.user.id })
      .populate('categoryId', 'name icon')
      .sort('-createdAt')
      .lean();
    res.json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/wanted-skills
const createWantedSkill = async (req, res) => {
  try {
    const skillData = { ...req.body, userId: req.user.id };
    const skill = await WantedSkill.create(skillData);
    const populated = await WantedSkill.findById(skill._id).populate('categoryId', 'name icon').lean();
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'This skill is already in your wanted list.' });
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/wanted-skills/:id
const updateWantedSkill = async (req, res) => {
  try {
    const skill = await WantedSkill.findOne({ _id: req.params.id, userId: req.user.id });
    if (!skill) return res.status(404).json({ success: false, message: 'Wanted skill not found or not yours.' });
    Object.assign(skill, req.body);
    await skill.save();
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/wanted-skills/:id
const deleteWantedSkill = async (req, res) => {
  try {
    const skill = await WantedSkill.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!skill) return res.status(404).json({ success: false, message: 'Wanted skill not found or not yours.' });
    res.json({ success: true, message: 'Wanted skill removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getWantedSkills, createWantedSkill, updateWantedSkill, deleteWantedSkill };
