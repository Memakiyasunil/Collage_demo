const SkillCategory = require('../models/SkillCategory');
const { createAuditLog } = require('../middleware/auditLogger');

// GET /api/skill-categories
const getCategories = async (req, res) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const filter = isAdmin ? {} : { isActive: { $ne: false } };

    const categories = await SkillCategory.find(filter)
      .sort({ displayOrder: 1, name: 1 })
      .lean();

    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/skill-categories/:id
const getCategoryById = async (req, res) => {
  try {
    const category = await SkillCategory.findById(req.params.id).lean();
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/skill-categories  [Admin only]
const createCategory = async (req, res) => {
  try {
    const category = await SkillCategory.create(req.body);
    await createAuditLog({ userId: req.user.id, action: 'CATEGORY_CREATED', resourceType: 'SkillCategory', resourceId: category._id, details: { name: category.name } });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'A category with this name already exists.' });
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/skill-categories/:id  [Admin only]
const updateCategory = async (req, res) => {
  try {
    const category = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    await createAuditLog({ userId: req.user.id, action: 'CATEGORY_UPDATED', resourceType: 'SkillCategory', resourceId: category._id, details: req.body });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/skill-categories/:id  [Admin only]
const deleteCategory = async (req, res) => {
  try {
    const category = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    await createAuditLog({ userId: req.user.id, action: 'CATEGORY_DELETED', resourceType: 'SkillCategory', resourceId: req.params.id });
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
