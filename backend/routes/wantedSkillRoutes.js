const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getWantedSkills, createWantedSkill, updateWantedSkill, deleteWantedSkill } = require('../controllers/wantedSkillController');

router.get('/', protect, getWantedSkills);
router.post('/', protect, createWantedSkill);
router.put('/:id', protect, updateWantedSkill);
router.delete('/:id', protect, deleteWantedSkill);

module.exports = router;
