const FavoriteSkill = require('../models/FavoriteSkill');
const Skill = require('../models/Skill');

// GET /api/favorites  — current user's favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteSkill.find({ userId: req.user.id })
      .populate({
        path: 'skillId',
        populate: [
          { path: 'categoryId', select: 'name icon' },
          { path: 'userId', select: 'name email' },
        ],
      })
      .sort('-createdAt')
      .lean();

    res.json({ success: true, count: favorites.length, data: favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/favorites  — toggle favorite (add or remove)
const toggleFavorite = async (req, res) => {
  try {
    const { skillId } = req.body;

    // Verify skill exists
    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found.' });
    if (skill.userId.toString() === req.user.id) {
      return res.status(400).json({ success: false, message: "You can't favorite your own skill." });
    }

    const existing = await FavoriteSkill.findOne({ userId: req.user.id, skillId });
    if (existing) {
      await existing.deleteOne();
      return res.json({ success: true, favorited: false, message: 'Removed from favorites' });
    }

    const fav = await FavoriteSkill.create({ userId: req.user.id, skillId });
    res.status(201).json({ success: true, favorited: true, data: fav });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/favorites/:id  — remove by favorite record ID
const removeFavorite = async (req, res) => {
  try {
    const fav = await FavoriteSkill.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!fav) return res.status(404).json({ success: false, message: 'Favorite not found.' });
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getFavorites, toggleFavorite, removeFavorite };
