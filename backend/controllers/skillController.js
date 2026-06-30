const Skill = require('../models/Skill');
const { createAuditLog } = require('../middleware/auditLogger');

// GET /api/skills  — search + filter + pagination (public browsing)
const getSkills = async (req, res) => {
  try {
    const { search, category, experience, userId, page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const filter = { isArchived: false, visibility: 'Public' };

    if (userId) filter.userId = userId;
    if (category) filter.categoryId = category;
    if (experience) filter.experienceLevel = experience;
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [skills, total] = await Promise.all([
      Skill.find(filter)
        .populate('categoryId', 'name icon')
        .populate('userId', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Skill.countDocuments(filter),
    ]);

    res.json({ success: true, count: skills.length, total, page: Number(page), data: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/skills/my  — current user's own skills (all visibility/archive states)
const getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user.id })
      .populate('categoryId', 'name icon')
      .sort('-createdAt')
      .lean();
    res.json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/skills/:id
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
      .populate('categoryId', 'name icon')
      .populate('userId', 'name email')
      .lean();
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/skills  [Auth required]
const createSkill = async (req, res) => {
  try {
    const skillData = { ...req.body, userId: req.user.id };
    const skill = await Skill.create(skillData);
    await createAuditLog({ userId: req.user.id, action: 'SKILL_CREATED', resourceType: 'Skill', resourceId: skill._id, details: { skillName: skill.skillName } });
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'You already have a skill with this name.' });
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/skills/:id  [Owner only]
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    if (skill.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can only edit your own skills.' });
    }

    // Prevent changing userId
    delete req.body.userId;

    Object.assign(skill, req.body);
    await skill.save();
    await createAuditLog({ userId: req.user.id, action: 'SKILL_UPDATED', resourceType: 'Skill', resourceId: skill._id, details: req.body });
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/skills/:id  [Owner or Admin]
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    if (skill.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You can only delete your own skills.' });
    }

    await skill.deleteOne();
    await createAuditLog({ userId: req.user.id, action: 'SKILL_DELETED', resourceType: 'Skill', resourceId: req.params.id });
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/skills/:id/archive  — toggle archive
const toggleArchive = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    if (skill.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can only archive your own skills.' });
    }
    skill.isArchived = !skill.isArchived;
    await skill.save();
    await createAuditLog({ userId: req.user.id, action: 'SKILL_ARCHIVED', resourceType: 'Skill', resourceId: skill._id, details: { isArchived: skill.isArchived } });
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getSkills, getMySkills, getSkillById, createSkill, updateSkill, deleteSkill, toggleArchive };
