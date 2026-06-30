const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');
const { getMatches, getMatchesByUserId } = require('../controllers/skillMatchController');

router.get('/', protect, getMatches);
router.get('/:userId', protect, roleCheck('admin'), getMatchesByUserId);

module.exports = router;
