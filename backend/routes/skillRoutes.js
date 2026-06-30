const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getSkills, getMySkills, getSkillById, createSkill, updateSkill, deleteSkill, toggleArchive } = require('../controllers/skillController');

// NOTE: /my must come BEFORE /:id to avoid being matched as an ID param
router.get('/my', protect, getMySkills);
router.get('/', getSkills);
router.get('/:id', getSkillById);
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);
router.patch('/:id/archive', protect, toggleArchive);

module.exports = router;
